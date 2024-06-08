import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '../DialogWrapper';
import { getCookie } from 'cookies-next';
import { signIn } from 'next-auth/react';
import { Button } from '../Button';

type AuthenticationFailureProps = {
    onCloseEvent: () => void;
};
export const AuthenticationFailure = ({
    onCloseEvent
}: AuthenticationFailureProps) => {
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        setOpen(true);
    }, []);

    const onCancelEvent = () => {
        setOpen(false);
        onCloseEvent();
    };
    return (
        <Dialog open={open} onOpenChange={onCancelEvent}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Authentication Required</DialogTitle>
                </DialogHeader>
                <article>
                    <p>
                        You are not authenticated. Please click login to
                        reauthenticate yourself.
                    </p>
                </article>
                <DialogFooter className="mt-5">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            onCancelEvent();
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            signIn('openiddict', undefined, {
                                __tenant: getCookie('__tenant') as string
                                // prompt: "login",
                            });
                        }}
                        variant="subtle"
                    >
                        Login
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
