// app/auth/signup/page.js
import AuthModal from '@/components/common/AuthModal'; // Assuming AuthModal is in "@/components/common"

const SignupPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <AuthModal mode="signup" />
        </div>
    );
};

export default SignupPage;