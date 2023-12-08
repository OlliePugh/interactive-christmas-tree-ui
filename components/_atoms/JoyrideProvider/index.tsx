"use client";

import dynamic from "next/dynamic";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ACTIONS, CallBackProps, EVENTS, Step } from "react-joyride";
import { UserContext } from "../UserProvider";

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
  PRESS_BAUBLE: 4,
  PRESS_BOARD: 5,
  PRESS_BOARD_COLOUR: 6,
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
      content:
        "Looks like its your first time here! Do you want to get a have quick tutorial",
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
    },
    {
      target: ".joyride-bulb-46",
      content: "Light",
      disableBeacon: true,
      hideFooter: true,
      disableOverlayClose: true,
    },
    {
      target: ".colourPicker",
      content: "Pick Colour",
      disableBeacon: true,
      hideFooter: true,
      disableOverlayClose: true,
    },
    {
      target: ".joyride-bauble-thumbnail-3",
      content: "Bauble",
      disableBeacon: true,
      hideFooter: true,
      disableOverlayClose: true,
    },
    {
      target: ".joyride-full-app",
      content: "Click on the board",
      disableBeacon: true,
      hideFooter: true,
      disableOverlayClose: true,
    },
    {
      target: ".colourPicker",
      content: "Pick Colour",
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
          if (user != null) {
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

  const onNextStep = ({ action, type }: CallBackProps) => {
    if (action === ACTIONS.NEXT && type === EVENTS.STEP_AFTER) {
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
        isInJoyride: currentStep < joyrideSteps.length,
      }}
    >
      <JoyRideNoSSR
        callback={onNextStep}
        stepIndex={currentStep}
        showProgress
        spotlightClicks
        showSkipButton
        run={!hasCompletedBefore}
        steps={joyrideSteps}
        continuous
      />
      {children}
    </JoyrideContext.Provider>
  );
};

export const useJoyride = () => useContext(JoyrideContext);

export default JoyrideProvider;
