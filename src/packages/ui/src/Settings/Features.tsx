import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle
} from '../Shared/DialogWrapper';
import { useToast } from '../Shared/hooks/useToast';
import { useForm } from 'react-hook-form';
import { useFeatures } from '@abpreact/hooks';
import { PermissionProvider } from '../utils';
import { Button } from '../Shared/Button';

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
                    <p>There isn't any available feature.</p>
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
                    <Button type="submit" variant="subtle">
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
