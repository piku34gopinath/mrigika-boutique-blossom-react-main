import React, { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Clock, Send } from "lucide-react";

const ContactPage: React.FC = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = () => {
		// Here you would typically send the message
		alert("Thank you for your message! We will get back to you soon.");
		setFormData({ name: "", email: "", subject: "", message: "" });
	};

	return (
		<div className="min-h-screen py-8">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-playfair font-bold mb-4">
							Get in Touch
						</h1>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							We'd love to hear from you. Send us a message and we'll respond as
							soon as possible.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Contact Information */}
						<div className="space-y-8">
							<div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
								<h2 className="text-2xl font-playfair font-semibold mb-6">
									Contact Information
								</h2>

								<div className="space-y-6">
									<div className="flex items-start space-x-4">
										<div className="p-3 bg-primary/10 rounded-full">
											<Mail className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold mb-1">Email</h3>
											<p className="text-muted-foreground">
												contact@mrigika.com
											</p>
											<p className="text-muted-foreground text-sm">
												We'll respond within 24 hours
											</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="p-3 bg-primary/10 rounded-full">
											<Phone className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold mb-1">Phone</h3>
											<p className="text-muted-foreground">+91 98765 43210</p>
											<p className="text-muted-foreground text-sm">
												Monday to Saturday, 10 AM - 7 PM
											</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="p-3 bg-primary/10 rounded-full">
											<MapPin className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold mb-1">Store Address</h3>
											<p className="text-muted-foreground">
												123 Fashion Street
											</p>
											<p className="text-muted-foreground">
												New Delhi, India 110001
											</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="p-3 bg-primary/10 rounded-full">
											<Instagram className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold mb-1">Follow Us</h3>
											<a
												href="https://www.instagram.com/mrigika?igsh=MTAwazc0MTA0N29jbQ=="
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary hover:text-primary-glow transition-colors"
											>
												@mrigika
											</a>
											<p className="text-muted-foreground text-sm">
												Latest updates and collections
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Store Hours */}
							<div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
								<div className="flex items-center space-x-3 mb-6">
									<Clock className="h-6 w-6 text-primary" />
									<h2 className="text-xl font-playfair font-semibold">
										Store Hours
									</h2>
								</div>

								<div className="space-y-3">
									<div className="flex justify-between">
										<span>Monday - Friday</span>
										<span className="text-muted-foreground">
											10:00 AM - 8:00 PM
										</span>
									</div>
									<div className="flex justify-between">
										<span>Saturday</span>
										<span className="text-muted-foreground">
											10:00 AM - 9:00 PM
										</span>
									</div>
									<div className="flex justify-between">
										<span>Sunday</span>
										<span className="text-muted-foreground">
											11:00 AM - 7:00 PM
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Contact Form */}
						<div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
							<h2 className="text-2xl font-playfair font-semibold mb-6">
								Send us a Message
							</h2>

							<div className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium mb-2">
											Name
										</label>
										<input
											type="text"
											value={formData.name}
											onChange={(e) =>
												handleInputChange("name", e.target.value)
											}
											className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
											placeholder="Your name"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-2">
											Email
										</label>
										<input
											type="email"
											value={formData.email}
											onChange={(e) =>
												handleInputChange("email", e.target.value)
											}
											className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
											placeholder="Your email"
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Subject
									</label>
									<input
										type="text"
										value={formData.subject}
										onChange={(e) =>
											handleInputChange("subject", e.target.value)
										}
										className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
										placeholder="What's this about?"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Message
									</label>
									<textarea
										value={formData.message}
										onChange={(e) =>
											handleInputChange("message", e.target.value)
										}
										className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
										rows={6}
										placeholder="Tell us how we can help you..."
									/>
								</div>

								<button
									onClick={handleSubmit}
									className="btn-boutique w-full flex items-center justify-center space-x-2"
								>
									<Send className="h-5 w-5" />
									<span>Send Message</span>
								</button>
							</div>
						</div>
					</div>

					{/* Store Location Map */}
					<div className="mt-16">
						<div className="text-center mb-8">
							<h2 className="text-3xl font-playfair font-bold mb-4">
								Visit Our Store
							</h2>
							<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
								Find us at our beautiful store location. We'd love to welcome
								you in person!
							</p>
						</div>

						<div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
								{/* Map */}
								<div className="lg:col-span-2">
									<div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2a6b5e3c1d1%3A0x2e7c5e7b3b3b3b3b!2sFashion%20Street%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1234567890"
											width="100%"
											height="100%"
											style={{ border: 0 }}
											allowFullScreen
											loading="lazy"
											referrerPolicy="no-referrer-when-downgrade"
											title="Mrigika Store Location"
										/>
									</div>
								</div>

								{/* Location Details */}
								<div className="space-y-6">
									<div>
										<h3 className="text-xl font-playfair font-semibold mb-4">
											Store Location
										</h3>
										<div className="space-y-3">
											<div className="flex items-start space-x-3">
												<MapPin className="h-5 w-5 text-primary mt-0.5" />
												<div>
													<p className="font-medium">123 Fashion Street</p>
													<p className="text-muted-foreground text-sm">
														New Delhi, India 110001
													</p>
												</div>
											</div>

											<div className="flex items-start space-x-3">
												<Phone className="h-5 w-5 text-primary mt-0.5" />
												<div>
													<p className="font-medium">+91 98765 43210</p>
													<p className="text-muted-foreground text-sm">
														Call us for directions
													</p>
												</div>
											</div>
										</div>
									</div>

									<div>
										<h4 className="font-semibold mb-3">Getting Here</h4>
										<div className="space-y-2 text-sm text-muted-foreground">
											<p>• Nearest Metro: Fashion Street Station (Line 2)</p>
											<p>• Bus Routes: 123, 456, 789</p>
											<p>• Parking available on-site</p>
											<p>• Wheelchair accessible</p>
										</div>
									</div>

									<div>
										<h4 className="font-semibold mb-3">Store Features</h4>
										<div className="space-y-2 text-sm text-muted-foreground">
											<p>• Spacious showroom</p>
											<p>• Fitting rooms available</p>
											<p>• Expert styling assistance</p>
											<p>• Customization services</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* FAQ Section */}
					<div className="mt-16">
						<h2 className="text-3xl font-playfair font-bold text-center mb-12">
							Frequently Asked Questions
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
							<div className="space-y-6">
								<div>
									<h3 className="font-semibold mb-2">
										What are your shipping charges?
									</h3>
									<p className="text-muted-foreground text-sm">
										We offer free shipping on orders above ₹1999. For orders
										below this amount, a nominal shipping charge of ₹99 applies.
									</p>
								</div>

								<div>
									<h3 className="font-semibold mb-2">
										Do you have a return policy?
									</h3>
									<p className="text-muted-foreground text-sm">
										Yes, we offer a 7-day hassle-free return policy. Items must
										be in original condition with tags attached.
									</p>
								</div>
							</div>

							<div className="space-y-6">
								<div>
									<h3 className="font-semibold mb-2">
										How can I track my order?
									</h3>
									<p className="text-muted-foreground text-sm">
										Once your order is shipped, you'll receive a tracking number
										via email and SMS to monitor your package.
									</p>
								</div>

								<div>
									<h3 className="font-semibold mb-2">
										Do you offer customization?
									</h3>
									<p className="text-muted-foreground text-sm">
										Yes, we offer customization services for select items.
										Contact us with your requirements for more details.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
