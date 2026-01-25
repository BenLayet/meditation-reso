import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Settings } from "./settings/Settings.tsx";

import { useSofter } from "@softer-components/redux-adapter";
import type { NewMeditationContract } from "./new-meditation.component.ts";

export const NewMeditation = ({ path } = { path: "/" }) => {
  const [, d, c] = useSofter<NewMeditationContract>(path);
  const { t } = useTranslation();
  return (
    <div className="card" style={{ maxWidth: "25em" }}>
      <div
        style={{
          minHeight: "200px",
          fontSize: "1.5em",
          position: "relative",
        }}
      >
        <Settings path={c.settings} />
      </div>
      <div>
        <button
          style={{ fontSize: "2em" }}
          aria-label={t("startMeditation")}
          onClick={() => {
            d.startClicked();
          }}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>
    </div>
  );
};
