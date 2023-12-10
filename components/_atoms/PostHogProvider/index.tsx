"use client";
import { ReactNode } from "react";

const posthog = `
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_SDv3ebSWmOnGKRDatRuLJz8MttofPGTncADQP3qdNHq',{api_host:'https://app.posthog.com'})
</script>`;

const iubenda = `
<script type="text/javascript">
var _iub = _iub || [];
_iub.csConfiguration = {"askConsentAtCookiePolicyUpdate":true,"countryDetection":true,"enableFadp":true,"enableLgpd":true,"enableTcf":true,"enableUspr":true,"floatingPreferencesButtonDisplay":"anchored-center-left","googleAdditionalConsentMode":true,"lang":"en","lgpdAppliesGlobally":false,"perPurposeConsent":true,"siteId":2889235,"tcfPurposes":{"2":"consent_only","7":"consent_only","8":"consent_only","9":"consent_only","10":"consent_only"},"whitelabel":false,"cookiePolicyId":33877500, "callback":{ "onConsentGiven":() => window.posthog.opt_in_capturing(),"onConsentRejected":() => window.posthog.opt_out_capturing() }, "banner":{ "acceptButtonDisplay":true,"backgroundOverlay":true,"closeButtonDisplay":false,"customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"logo":null,"position":"float-bottom-center","rejectButtonDisplay":true }};
</script>
<script type="text/javascript" src="//cs.iubenda.com/sync/2889235.js"></script>
<script type="text/javascript" src="//cdn.iubenda.com/cs/tcf/beta/stub-v2.js"></script>
<script type="text/javascript" src="//cdn.iubenda.com/cs/tcf/beta/safe-tcf-v2.js"></script>
<script type="text/javascript" src="//cdn.iubenda.com/cs/gpp/beta/stub.js"></script>
<script type="text/javascript" src="//cdn.iubenda.com/cs/beta/iubenda_cs.js" charset="UTF-8" async></script>
`;

export default function AnalyticsProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: posthog }} />
      <div dangerouslySetInnerHTML={{ __html: iubenda }} />
      {children}
    </>
  );
}
