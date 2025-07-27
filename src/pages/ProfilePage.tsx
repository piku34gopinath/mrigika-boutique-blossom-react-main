import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const ProfilePage = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		} else {
			navigate("/signin");
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
		<div>
			<Navigation
				cartItemsCount={0}
				currentPage="profile"
				onPageChange={(page) => navigate(page === "home" ? "/" : `/${page}`)}
			/>
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
		</div>
	);
};

export default ProfilePage;
