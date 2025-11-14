import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface tabItem {
  name: string;
  content: ReactNode;
  icon: LucideIcon;
}

interface props {
  tabList: tabItem[];
}

export default function TabLayout({ tabList }: props) {
  return (
    <Tabs defaultValue={tabList[0].name}>
      <TabsList className="w-full bg-primary-container rounded-2xl">
        {tabList.map((v, idx) => {
          return (
            <TabsTrigger
              className="active:bg-accent-primary md:hover:bg-secondary-container active:text-on-accent-primary rounded-2xl data-[state=active]:text-on-accent-primary data-[state=active]:bg-accent-primary "
              key={v.name + idx}
              value={v.name}
            >
              <v.icon />
              <p className="hidden md:block">{v.name}</p>
            </TabsTrigger>
          );
        })}
      </TabsList>
      {tabList.map((v, idx) => {
        return (
          <TabsContent className="mt-8" key={v.name + idx} value={v.name}>
            {v.content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
