// components/IterateDialog.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface IterateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStage: string;
  onSubmit: (feedback: string, target?: string) => void;
}

export function IterateDialog({ 
  open, 
  onOpenChange, 
  currentStage, 
  onSubmit 
}: IterateDialogProps) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    
    // TODO: Call backend with feedback and optional target
    onSubmit(feedback.trim());
    
    // Reset and close
    setTimeout(() => {
      setFeedback("");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 400);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#111111] border-white/10">
        <DialogHeader>
          <DialogTitle>Iterate on {currentStage}</DialogTitle>
          <DialogDescription>
            Provide feedback on what needs improvement. The system will re-run the relevant stage or sub-step.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="feedback">Feedback / Instructions</Label>
            <Textarea
              id="feedback"
              placeholder="e.g. Need stronger user research and more diverse concepts..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[120px] bg-[#0A0A0A] border-white/20"
            />
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!feedback.trim() || isSubmitting}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isSubmitting ? "Submitting..." : "Submit & Iterate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
