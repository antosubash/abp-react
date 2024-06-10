import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '../ui/use-toast';
import { useFeatures } from '@/lib/hooks/useFeatures';
import { PermissionProvider } from '@/lib/utils';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';


type FeaturesProps = {
    onDismiss: () => void;
};
export const Features = ({ onDismiss }: FeaturesProps) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { handleSubmit, register } = useForm();
    const { data } = useFeatures(PermissionProvider.T, 'undefined');
    console.log(data, 'data');
    const onCloseEvent = () => {
        setOpen(false);
        onDismiss();
    };

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
      <Dialog open={open} onOpenChange={onCloseEvent}>
        <DialogContent>
          <DialogTitle>Features</DialogTitle>
          <article>
            <p>There isn&apos;t any available feature.</p>
          </article>
          <DialogFooter className="mt-5">
            <Button
              onClick={(e) => {
                e.preventDefault();
                onCloseEvent();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
};
