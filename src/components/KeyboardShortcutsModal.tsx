import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface KeyboardShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcutsModal({ open, onOpenChange }: KeyboardShortcutsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">?</kbd> to open this menu
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <ShortcutItem shortcut="Home" keyChar="h" />
          <ShortcutItem shortcut="Projects" keyChar="p" />
          <ShortcutItem shortcut="Experience" keyChar="e" />
          <ShortcutItem shortcut="Contact" keyChar="c" />
          <ShortcutItem shortcut="Search" keyChar="/" />
          <ShortcutItem shortcut="Toggle Theme" keyChar="t" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ShortcutItem({ shortcut, keyChar }: { shortcut: string; keyChar: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{shortcut}</span>
      <Badge variant="outline" className="font-mono text-xs">
        {keyChar}
      </Badge>
    </div>
  );
}
