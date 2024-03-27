import { Navigation } from "./ui/navigation/Navigation";
import { TitlePanel } from "./ui/panels/title-panel";

export default function DashboardPage() {
  return (
    <>
      <TitlePanel title="Home Page | Dashboard" routeSegments={["/"]} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="text-gray-700">
          <h1>Hello happy reader</h1>
          <div>
            Here will be placed some general information about the project and
            features the users can access.
          </div>
        </div>
      </main>
    </>
  );
}
