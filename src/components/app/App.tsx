import { useSofter } from "@softer-components/redux-adapter";
import { NewMeditation } from "../new-meditation/NewMeditation.tsx";
import type { AppContract } from "./app.component.ts";
import { MeditationSession } from "../meditation-session/MeditationSession.tsx";
import packageJson from "../../../package.json";
import buildInfoJson from "../../../build-info.json";
const packageVersion = packageJson.version;
const branch = buildInfoJson.branch;
const builtAt = new Date(buildInfoJson.builtAt).toLocaleString();
const commitRef = buildInfoJson.commit;
const build = [packageVersion, branch, builtAt, commitRef].join("-");
export const App = ({ path } = { path: "/" }) => {
  const [v, , c] = useSofter<AppContract>(path);
  return (
    <div>
      {!v.isStarted && c.newMeditation && (
        <>
          <NewMeditation path={c.newMeditation} />
          <span className="nearly-invisible">v{build}</span>
        </>
      )}
      {v.isStarted && c.meditationSession && (
        <MeditationSession path={c.meditationSession} />
      )}
    </div>
  );
};
