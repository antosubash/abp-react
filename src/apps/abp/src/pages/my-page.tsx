import { useRouter } from 'next/router';
import { useCurrentUser } from '@abpreact/hooks';

export default function MyPage() {
	const router = useRouter();
	const currentUser = useCurrentUser();

	return (
		<div>
			<h1>My Page</h1>
			<p>Current Route: {router.pathname}</p>
			<p>Current User: {currentUser?.userName}</p>
		</div>
	);
}
