import PupSprite, { type PupPose } from "./PupSprite";

/**
 * Marks a spot on the page where Teddy likes to hang out. The roaming dog (PupJourney) walks from one
 * stop to the next as you scroll. The box is sized with className (width), keeps the sprite's aspect
 * ratio, and shows a static dog when JavaScript is off or motion is reduced.
 */
export default function PupStop({
  pose = "sit",
  facing = "right",
  act,
  behind = false,
  lane = false,
  className = "",
}: {
  pose?: PupPose;
  facing?: "left" | "right";
  /** peekaboo | treadmill | basket | tilt */
  act?: string;
  /** dog is drawn behind the page's foreground (e.g. the hero wall) while here */
  behind?: boolean;
  /** kept on phones, where the dog only visits a few spots */
  lane?: boolean;
  className?: string;
}) {
  return (
    <div
      data-pup-stop
      data-pose={pose}
      data-facing={facing}
      data-act={act}
      data-behind={behind || undefined}
      data-lane={lane || undefined}
      aria-hidden
      className={`pup-stop aspect-[300/240] ${className}`}
    >
      <PupSprite pose={pose} style={facing === "left" ? { transform: "scaleX(-1)" } : undefined} />
    </div>
  );
}
