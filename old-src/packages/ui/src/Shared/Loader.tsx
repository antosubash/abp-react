import { Loader2 } from 'lucide-react';
const Loader = () => {
    return (
        <div className="w-full min-h-[20rem] flex items-center justify-center z-50">
            <Loader2 width={24} height={24} className="animate-spin" />
        </div>
    );
};

export default Loader;
