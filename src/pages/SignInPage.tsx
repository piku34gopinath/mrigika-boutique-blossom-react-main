import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";

const SignInPage = () => {
	const [isSigningUp, setIsSigningUp] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	// Sign-in state
	const [signInIdentifier, setSignInIdentifier] = useState("");
	const [signInPassword, setSignInPassword] = useState("");

	// Sign-up state
	const [signUpName, setSignUpName] = useState("");
	const [signUpPhone, setSignUpPhone] = useState("");
	const [signUpEmail, setSignUpEmail] = useState("");
	const [signUpAddress, setSignUpAddress] = useState("");
	const [signUpPassword, setSignUpPassword] = useState("");
	const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

	const handleSignIn = () => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			const user = JSON.parse(storedUser);
			if (
				(signInIdentifier === user.email || signInIdentifier === user.phone) &&
				signInPassword === user.password
			) {
				navigate("/");
			} else {
				setError("Invalid credentials");
			}
		} else {
			setError("No user found. Please sign up.");
		}
	};

	const handleSignUp = () => {
		if (
			!signUpName ||
			!signUpPhone ||
			!signUpEmail ||
			!signUpAddress ||
			!signUpPassword ||
			!signUpConfirmPassword
		) {
			setError("Please fill in all fields.");
			return;
		}
		if (signUpPassword !== signUpConfirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		const user = {
			name: signUpName,
			phone: signUpPhone,
			email: signUpEmail,
			address: signUpAddress,
			password: signUpPassword,
		};
		localStorage.setItem("user", JSON.stringify(user));
		setIsSigningUp(false);
		setError("");
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-background">
			<div className="w-full max-w-md p-8 space-y-6 bg-card rounded-2xl shadow-soft">
				<div className="flex justify-center mb-6">
					<div className="flex items-center space-x-3 cursor-pointer select-none group">
						<span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-md group-hover:scale-105 transition-transform">
							<Heart className="h-9 w-9 text-white" />
						</span>
						<span className="text-4xl font-extrabold font-playfair gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide">
							Mrigika
						</span>
					</div>
				</div>

				{isSigningUp ? (
					// Sign-up form
					<>
						<div className="space-y-2">
							<Label htmlFor="signUpName">Name</Label>
							<Input
								id="signUpName"
								value={signUpName}
								onChange={(e) => setSignUpName(e.target.value)}
							/>
							<Label htmlFor="signUpPhone">Phone Number</Label>
							<Input
								id="signUpPhone"
								value={signUpPhone}
								onChange={(e) => setSignUpPhone(e.target.value)}
							/>
							<Label htmlFor="signUpEmail">Email</Label>
							<Input
								id="signUpEmail"
								type="email"
								value={signUpEmail}
								onChange={(e) => setSignUpEmail(e.target.value)}
							/>
							<Label htmlFor="signUpAddress">Address</Label>
							<Input
								id="signUpAddress"
								value={signUpAddress}
								onChange={(e) => setSignUpAddress(e.target.value)}
							/>
							<Label htmlFor="signUpPassword">Password</Label>
							<Input
								id="signUpPassword"
								type="password"
								value={signUpPassword}
								onChange={(e) => setSignUpPassword(e.target.value)}
							/>
							<Label htmlFor="signUpConfirmPassword">Confirm Password</Label>
							<Input
								id="signUpConfirmPassword"
								type="password"
								value={signUpConfirmPassword}
								onChange={(e) => setSignUpConfirmPassword(e.target.value)}
							/>
						</div>
						{error && <p className="text-sm text-red-500">{error}</p>}
						<div className="space-y-4 pt-4">
							<Button onClick={handleSignUp} className="w-full text-lg py-6">
								Sign Up
							</Button>
							<p className="text-center text-sm text-muted-foreground">
								Already have an account?{" "}
								<Button
									variant="link"
									className="p-0"
									onClick={() => setIsSigningUp(false)}
								>
									Sign In
								</Button>
							</p>
						</div>
					</>
				) : (
					// Sign-in form
					<>
						<div className="space-y-4">
							<div>
								<Label htmlFor="signInIdentifier">Email or Phone Number</Label>
								<Input
									id="signInIdentifier"
									placeholder="you@example.com or 1234567890"
									value={signInIdentifier}
									onChange={(e) => setSignInIdentifier(e.target.value)}
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="signInPassword">Password</Label>
								<Input
									id="signInPassword"
									type="password"
									value={signInPassword}
									onChange={(e) => setSignInPassword(e.target.value)}
									className="mt-1"
								/>
							</div>
						</div>
						{error && <p className="text-sm text-red-500">{error}</p>}
						<div className="space-y-4 pt-4">
							<Button onClick={handleSignIn} className="w-full text-lg py-6">
								Sign In
							</Button>
							<div className="relative flex items-center justify-center my-4">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-border" />
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-2 bg-card text-muted-foreground">
										OR
									</span>
								</div>
							</div>
							<p className="text-center text-sm text-muted-foreground">
								Don't have an account?{" "}
								<Button
									variant="link"
									className="p-0"
									onClick={() => setIsSigningUp(true)}
								>
									Sign Up
								</Button>
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default SignInPage;
