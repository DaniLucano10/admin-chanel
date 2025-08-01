import * as RadixTooltip from "@radix-ui/react-tooltip";

export const Tooltip = ({ children, text }) => {
  return (
    <RadixTooltip.Provider delayDuration={100}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side="top"
            align="center"
            sideOffset={8}
            className="z-[9999] rounded-md bg-gray-950 px-3 py-1.5 text-sm text-white shadow-md animate-fade-in"
          >
            {text}
            <RadixTooltip.Arrow className="fill-gray-950" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
