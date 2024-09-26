import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import AdminPanelButton from "@/public/assets/admin-panel-btn.png";
import AdminPanel from "@/public/assets/admin-panel.png";

export const metadata = {
	title: "Quiz Game",
	description: "This is Quiz Game",
};

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className={"flex flex-col gap-10 min-h-screen bg-primary pt-8"}>
					<div className="relative">
						<Image src={AdminPanelButton} alt="admin-panel-btn" className="h-[100px] mx-auto" />
						<div className="font-light absolute inset-0 flex justify-center items-center text-5xl tracking-tighter">Admin Panel</div>
					</div>
					<div className="relative w-[80%] mx-auto">
						<Image src={AdminPanel} alt="admin-panel-border" className="h-[500px] mx-auto" />
						<div className="absolute inset-0 flex flex-col gap-10 m-10">
							asdasd
						</div>
						{children}
					</div>
				</div>
			</body >
		</html >
	);
}
