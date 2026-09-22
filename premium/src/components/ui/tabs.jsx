// Adapted from shadcn/ui Tabs (MIT). Visual styling is part of the S&S design system.
import * as TabsPrimitive from '@radix-ui/react-tabs';
export const Tabs = TabsPrimitive.Root;
export function TabsList(props) { return <TabsPrimitive.List className="ui-tabs" {...props}/>; }
export function TabsTrigger(props) { return <TabsPrimitive.Trigger className="ui-tab" {...props}/>; }
export const TabsContent = TabsPrimitive.Content;
