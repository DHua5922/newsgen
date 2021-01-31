import { useRouter } from 'next/router';

export default function Reset() {
    const router = useRouter();
    const { token } = router.query;
    return(<div>Password reset page: {token}</div>)
}