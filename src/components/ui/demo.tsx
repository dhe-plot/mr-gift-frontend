import { GlowCard } from "./spotlight-card";

export function Default() {
  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center gap-10 custom-cursor">
      <GlowCard>Card 1</GlowCard>
      <GlowCard glowColor="purple">Card 2</GlowCard>
      <GlowCard glowColor="green">Card 3</GlowCard>
    </div>
  );
}
