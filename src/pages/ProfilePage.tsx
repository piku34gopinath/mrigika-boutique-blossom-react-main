import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
	const [user, setUser] = useState<{name: string; email: string; phone: string; address: string} | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		} else {
            // For now, let's create a dummy user if one doesn't exist
            const dummyUser = {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                address: "123 Main St, Anytown, USA"
            }
            setUser(dummyUser);
			// navigate("/signin");
		}
	}, [navigate]);

	const handleSignOut = () => {
		localStorage.removeItem("user");
		navigate("/signin");
	};

	if (!user) {
		return null;
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-background">
			<div className="w-full max-w-md p-8 space-y-6 bg-card rounded-2xl shadow-soft">
				<h1 className="text-3xl font-bold text-center">Profile</h1>
				<div className="space-y-4">
					<div>
						<p className="font-semibold">Name:</p>
						<p>{user.name}</p>
					</div>
					<div>
						<p className="font-semibold">Email:</p>
						<p>{user.email}</p>
					</div>
					<div>
						<p className="font-semibold">Phone:</p>
						<p>{user.phone}</p>
					</div>
					<div>
						<p className="font-semibold">Address:</p>
						<p>{user.address}</p>
					</div>
				</div>
				<Button onClick={handleSignOut} className="w-full">
					Sign Out
				</Button>
			</div>
		</div>
	);
};

export default ProfilePage;
