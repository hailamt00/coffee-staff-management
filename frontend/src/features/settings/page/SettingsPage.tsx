import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui/tabs'

import GeneralSettings from '../components/GeneralSettings'
import SecuritySettings from '../components/SecuritySettings'
import AppearanceSettings from '../components/AppearanceSettings'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage system and application preferences
        </p>
      </div>

      <Card className="border-slate-200 dark:border-neutral-800">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <GeneralSettings />
            </TabsContent>

            <TabsContent value="security">
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="appearance">
              <AppearanceSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
