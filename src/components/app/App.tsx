import { useSofter } from "@softer-components/redux-adapter";
import { NewMeditation } from "../new-meditation/NewMeditation.tsx";
import type { AppContract } from "./app.component.ts";
import { MeditationSession } from "../meditation-session/MeditationSession.tsx";
import packageJson from "../../../package.json";
const packageVersion = packageJson.version;
const branch = process.env.BRANCH as string | undefined;
const head = process.env.HEAD as string | undefined;
const commitRef = process.env.COMMIT_REF as string | undefined;
const build = [packageVersion, branch, head, commitRef].join("-");
export const App = ({ path } = { path: "/" }) => {
  const [v, , c] = useSofter<AppContract>(path);
  return (
    <div>
      {!v.isStarted && c.newMeditation && (
        <>
          <NewMeditation path={c.newMeditation} />
          <span
            style={{
              fontSize: "0.8em",
              opacity: 0.1,
            }}
          >
            v{build}
          </span>
        </>
      )}
      {v.isStarted && c.meditationSession && (
        <MeditationSession path={c.meditationSession} />
      )}
    </div>
  );
};
