"use client";

import dynamic from "next/dynamic";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ACTIONS, CallBackProps, EVENTS, LIFECYCLE, Step } from "react-joyride";
import { UserContext } from "../UserProvider";
import { colours } from "@/config/palette";

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });

const defaultContext = {
  lightPressed: false,
  baublePressed: false,
  lightColourChosen: false,
  baubleColourChosen: false,
  boardPressed: false,
};

interface WalkthroughEvents {
  lightPressed: boolean;
  lightColourChosen: boolean;
  baublePressed: boolean;
  baubleColourChosen: boolean;
  boardPressed: boolean;
}

type JoyrideContextPayload = WalkthroughEvents & {
  update: (updatedVaulue: Partial<WalkthroughEvents>) => void;
  isInJoyride: boolean;
};

export const JoyrideContext = createContext<JoyrideContextPayload>({
  ...defaultContext,
  update: () => {},
  isInJoyride: true,
});

const STEP_NAMES = {
  WELCOME: 0,
  LOGIN: 1,
  PRESS_LIGHT: 2,
  PRESS_LIGHT_COLOUR: 3,
  OBSERVE_LIGHT: 4,
  PRESS_BAUBLE: 5,
  PRESS_BOARD: 6,
  PRESS_BOARD_COLOUR: 7,
};

const JoyrideProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const user = useContext(UserContext);
  const [observedEvents, setObservedEvents] =
    useState<Omit<WalkthroughEvents, "update">>(defaultContext);
  const [hasCompletedBefore, setHasCompletedBefore] = useState(true);

  useEffect(() => {
    setHasCompletedBefore(localStorage.getItem("joyride-done") === "true");
  }, []);

  const joyrideSteps: Step[] = [
    {
      content: "Welcome! This is a quick tour of how to use the tree!",
      disableBeacon: true,
      placement: "center",
      target: "#body",
    },
    {
      target: ".joyride-login",
      content:
        "First things first, you're going to need to log in to make any changes to the tree. All you need is a google account. There is more info about this in the 'What is this' section.",
      disableBeacon: true,
      disableOverlayClose: true,
      hideFooter: true,
    },
    {
      target: ".joyride-bulb-48",
      content:
        "Press this light bulb to change the colour of a bulb on the tree!",
      disableBeacon: true,
      hideFooter: true,
      disableOverlayClose: true,
    },
    {
      target: ".colourPicker",
      content: "Pick the colour you want!",
      disableBeacon: true,
      hideFooter: true,
      disableOverlayClose: true,
    },
    {
      target: ".joyride-bulb-48",
      content:
        "In a second or two the bulb will change to the colour you chose!",
      disableBeacon: true,
      disableOverlayClose: true,
    },
    {
      target: ".joyride-bauble-thumbnail-3",
      content:
        "Click on the ornament to begin drawing pixel art on the ornaments",
      disableBeacon: true,
      hideFooter: true,
      disableOverlayClose: true,
    },
    {
      target: ".joyride-full-app",
      content: "Click on the board to select a pixel",
      disableBeacon: true,
      hideFooter: true,
      disableOverlayClose: true,
    },
    {
      target: ".colourPicker",
      content: "Pick the colour you want!",
      disableBeacon: true,
      hideFooter: true,
      disableOverlayClose: true,
    },
  ];

  const update = (updatedValue: Partial<WalkthroughEvents>) => {
    const newObservedEvents = { ...observedEvents, ...updatedValue };
    setObservedEvents(newObservedEvents);
  };

  const completeJoyride = () => {
    localStorage.setItem("joyride-done", "true");
  };

  const attemptProgress = useCallback(
    (pressedNext: boolean = false) => {
      if (currentStep === joyrideSteps.length) {
        completeJoyride();
      }

      const progressStage = () =>
        setCurrentStep((currentStep) => currentStep + 1);
      switch (currentStep) {
        case STEP_NAMES.LOGIN:
          if (user.user != null) {
            progressStage(); // skip the login
          }
          break;
        case STEP_NAMES.PRESS_LIGHT:
          if (observedEvents.lightPressed) {
            progressStage();
          }
          break;
        case STEP_NAMES.PRESS_LIGHT_COLOUR: {
          if (observedEvents.lightColourChosen) {
            progressStage();
          }
          break;
        }
        case STEP_NAMES.PRESS_BAUBLE: {
          if (observedEvents.baublePressed) {
            progressStage();
          }
          break;
        }
        case STEP_NAMES.PRESS_BOARD: {
          if (observedEvents.boardPressed) {
            progressStage();
          }
          break;
        }
        case STEP_NAMES.PRESS_BOARD: {
          if (observedEvents.baubleColourChosen) {
            progressStage();
          }
          break;
        }
        case STEP_NAMES.PRESS_BOARD_COLOUR: {
          if (observedEvents.baubleColourChosen) {
            progressStage();
          }
          break;
        }
        default:
          if (currentStep + 1 < joyrideSteps.length && pressedNext) {
            progressStage();
          }
          break;
      }
    },
    [currentStep, joyrideSteps.length, observedEvents, user]
  );

  useEffect(
    () => attemptProgress(false),
    [currentStep, joyrideSteps.length, observedEvents, user, attemptProgress]
  );

  const onNextStep = (props: CallBackProps) => {
    const unmanagedSteps = [STEP_NAMES.WELCOME, STEP_NAMES.OBSERVE_LIGHT];
    const { action, type, index } = props;
    if (
      action === ACTIONS.NEXT &&
      type === EVENTS.STEP_AFTER &&
      unmanagedSteps.includes(index)
    ) {
      attemptProgress(true);
    }
    if (action == ACTIONS.CLOSE) {
      completeJoyride();
      setCurrentStep(1000); // jankkkk
    }
  };

  return (
    <JoyrideContext.Provider
      value={{
        ...observedEvents,
        update,
        isInJoyride: currentStep < joyrideSteps.length && !hasCompletedBefore,
      }}
    >
      <JoyRideNoSSR
        callback={onNextStep}
        stepIndex={currentStep}
        spotlightClicks
        showSkipButton={false}
        run={!hasCompletedBefore}
        steps={joyrideSteps}
        continuous
        hideBackButton
        styles={{
          options: {
            primaryColor: colours.PRIMARY1,
          },
        }}
      />
      {children}
    </JoyrideContext.Provider>
  );
};

export const useJoyride = () => useContext(JoyrideContext);

export default JoyrideProvider;
