import RegisterCard from "@/components/auth/RegisterCard";
import Layout from "@/layout/Layout";



export default function Profile() {
	return (
    <Layout>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
        <div className="grid h-screen grid-cols-6 gap-4">
          {/* Avatar User*/}
          <div className="col-span-1 bg-gray-200">
            <RegisterCard />
          </div>

          {/* Header */}
          <div className="col-span-3 bg-gray-200">
            <RegisterCard />
          </div>

          {/* Right Panel for User Options */}
          <div className="col-span-2 bg-gray-200">
            <RegisterCard />
          </div>

          {/* Main Content */}
          <div className="col-span-4 overflow-y-auto bg-gray-200">
            <RegisterCard />
          </div>

          {/* Friends and Rooms */}
          <div className="col-span-2 overflow-y-auto bg-gray-200">
            <RegisterCard />
          </div>

        </div>
      </div>
    </Layout>
	);
}
