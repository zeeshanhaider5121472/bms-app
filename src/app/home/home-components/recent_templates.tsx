import { dataBase } from "@/src/lib/db";
import { Database } from "@/src/lib/types";

const Recent_Templates = async () => {
  let fakeRecent = [
    { id: 1, name: "Template 1", date: "May 03/2024" },
    { id: 2, name: "Template 2", date: "May 03/2024" },
    { id: 3, name: "Template 3", date: "May 03/2024" },
    { id: 4, name: "Template 4", date: "May 03/2024" },
    { id: 5, name: "Template 5", date: "May 03/2024" },
    { id: 6, name: "Template 6", date: "May 03/2024" },
    { id: 7, name: "Template 7", date: "May 03/2024" },
    { id: 8, name: "Template 8", date: "May 03/2024" },
    { id: 9, name: "Template 9", date: "May 03/2024" },
    { id: 10, name: "Template 10", date: "May 03/2024" },
  ];

  // 1. Fetch your database data
  const db: Database = await dataBase();

  // 2. Extract process keys or values to render dynamically
  // Object.keys(db.Allprocesses) gives you: ["DrBeen Video Process", "DrBeen Video Process2"]
  // Or if you want to loop through the process objects directly:
  const processes = Object.values(db.Allprocesses);

  return (
    <div className="items-center relative overflow-x-auto overflow-y-scroll no-scrollbar flex flex-row gap-5 pl-5 py-2">
      {processes.map((processItem, index) => {
        // Accessing nested templates/steps if needed:
        // const templateName = processItem.template1?.templatename;

        return (
          <div
            key={index}
            className="flex flex-row h-28 rounded-lg shadow-md hover:shadow-blue-300 transition-shadow cursor-pointer"
          >
            <div className="bg-blue-500 h-full w-2 rounded-s-lg" />
            <div className="shrink-0 h-full w-60 rounded-e-lg bg-white outline outline-gray-300 items-center gap-2 py-3 px-2">
              {/* Displaying the process name from the database */}
              <p className="text-sm font-medium">{processItem.processname}</p>

              {/* You can also pull fields from nested templates if needed */}
              <p className="text-sm text-gray-600">
                Template: {processItem.template1?.templatename || "N/A"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Recent_Templates;
