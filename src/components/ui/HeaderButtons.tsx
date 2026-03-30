import UI from "@/components/ui/index.ts";
import { Dismiss16Filled } from "@fluentui/react-icons";
import DiscordIcon from "@icons/discord-16.svg";
import GitlabIcon from "@icons/gitlab-16.svg";
import React from "react";

const HeaderButtons: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const openLink = (url: string) => open(url, "_blank", "noopener,noreferrer");

  return (
    <>
      <UI.Button
        variant="icon"
        className="discord"
        onClick={() => openLink("https://sanooj.uk/spicetify-discord")}
        aria-label="Join Discord"
      >
        <DiscordIcon />
      </UI.Button>
      <UI.Button
        variant="icon"
        className="github"
        onClick={() => openLink("https://gitlab.com/sanoojes/spicetify-glassify")}
        aria-label="View on Gitlab"
      >
        <GitlabIcon />
      </UI.Button>
      <UI.Button variant="icon" onClick={closeModal} aria-label="Close Modal">
        <Dismiss16Filled />
      </UI.Button>
    </>
  );
};

export default HeaderButtons;
