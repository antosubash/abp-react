import { QueryNames, useFeatures } from '@abpreact/hooks';
import { FeatureGroupDto } from '@abpreact/proxy';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '../Shared/DialogWrapper';
import { useEffect, useState } from 'react';
import { useToast } from '../Shared/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../Shared/Button';
export type FeatureListProps = {
    onDismiss: () => void;
};

export const FeatureList = ({ onDismiss }: FeatureListProps) => {
    const { data } = useFeatures('T', undefined);
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const onCloseEvent = () => {
        setOpen(false);
        onDismiss();
    };

    console.log(data, 'data');

    useEffect(() => {
        setOpen(true);
        return () => {
            queryClient.invalidateQueries([QueryNames.GetTenants]);
            queryClient.invalidateQueries(['T']);
        };
    }, []);
    return (
        <section className="p-3">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="text-white">
                    <DialogHeader>
                        <DialogTitle>Features</DialogTitle>
                    </DialogHeader>
                    <div className="border-2 border-black p-5 text-white">
                        {data?.groups?.map(
                            (el: FeatureGroupDto, index: number) => (
                                <div key={index}>{el.displayName}</div>
                            )
                        )}
                        {data?.groups?.map(
                            (el: FeatureGroupDto, index: number) => (
                                <div key={index}>
                                    {el.features?.map((feature, index) => (
                                        <div key={index}>
                                            {feature.displayName}
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                    <DialogFooter className="mt-5">
                        <Button variant="outline" onClick={onCloseEvent}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="outline">
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
};
