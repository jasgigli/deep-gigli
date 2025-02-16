// app/settings/page.js
import SettingsModal from '@/components/common/SettingsModal'; // Assuming SettingsModal is in "@/components/common"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SettingsPageRoute = () => {
    const router = useRouter();

    useEffect(() => {
        // Since SettingsModal is used as a modal, we can redirect back to the main page after closing.
        // Alternatively, you can render SettingsModal directly here if you want a dedicated settings page.
        router.push('/'); // Redirect to home page, adjust as needed
    }, [router]);

    return (
        <div>
            {/* Settings are handled by the modal, this page might not need to render anything directly */}
            <p>Redirecting to main page...</p>
        </div>
    );
};

export default SettingsPageRoute;