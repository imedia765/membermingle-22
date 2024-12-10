import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinanceOverviewTab } from "./tabs/FinanceOverviewTab";
import { FinancePaymentsTab } from "./tabs/FinancePaymentsTab";
import { FinanceExpensesTab } from "./tabs/FinanceExpensesTab";
import { FinanceCollectorsTab } from "./tabs/FinanceCollectorsTab";
import { FinanceReportsTab } from "./tabs/FinanceReportsTab";

interface FinanceTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export function FinanceTabs({ activeTab, setActiveTab }: FinanceTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
      <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 gap-2 p-2">
        <TabsTrigger value="overview" className="w-full text-sm md:text-base py-2">Overview</TabsTrigger>
        <TabsTrigger value="payments" className="w-full text-sm md:text-base py-2">Payments</TabsTrigger>
        <TabsTrigger value="expenses" className="w-full text-sm md:text-base py-2">Expenses</TabsTrigger>
        <TabsTrigger value="collectors" className="w-full text-sm md:text-base py-2">Collectors</TabsTrigger>
        <TabsTrigger value="reports" className="w-full text-sm md:text-base py-2">Reports</TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="overview">
          <FinanceOverviewTab />
        </TabsContent>
        <TabsContent value="payments">
          <FinancePaymentsTab />
        </TabsContent>
        <TabsContent value="expenses">
          <FinanceExpensesTab />
        </TabsContent>
        <TabsContent value="collectors">
          <FinanceCollectorsTab />
        </TabsContent>
        <TabsContent value="reports">
          <FinanceReportsTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}