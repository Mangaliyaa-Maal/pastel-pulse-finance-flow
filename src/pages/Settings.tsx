
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBudgets } from "@/data/mockData";

const Settings = () => {
  const { toast } = useToast();
  const [currency, setCurrency] = useState("USD");
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-royal-darkPurple">Settings</h2>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card className="royal-card">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-royal-purple/20 flex items-center justify-center text-2xl font-bold text-royal-purple">
                    JD
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" className="border-royal-purple/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" className="border-royal-purple/20" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="royal-card">
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" className="border-royal-purple/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="border-royal-purple/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" className="border-royal-purple/20" />
                </div>
                <Button className="w-full bg-royal-purple hover:bg-royal-darkPurple">
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-4">
            <Card className="royal-card">
              <CardHeader>
                <CardTitle>App Preferences</CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Push notifications</Label>
                  <Switch id="notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">Dark mode</Label>
                  <Switch id="darkMode" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="weekStart">Week starts on Sunday</Label>
                  <Switch id="weekStart" defaultChecked />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select 
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full rounded-md border border-royal-purple/20 bg-transparent px-3 py-2 text-sm shadow-sm"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <select 
                    id="dateFormat"
                    className="w-full rounded-md border border-royal-purple/20 bg-transparent px-3 py-2 text-sm shadow-sm"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </CardContent>
            </Card>
            
            <Card className="royal-card">
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Manage your financial data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">Export All Data</Button>
                <Button variant="outline" className="w-full">Import Data</Button>
                <Button variant="destructive" className="w-full">Clear All Data</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            <Card className="royal-card">
              <CardHeader>
                <CardTitle>Budget Categories</CardTitle>
                <CardDescription>Manage your spending categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockBudgets.map((budget) => (
                  <div key={budget.id} className="flex items-center justify-between p-2 border border-royal-purple/10 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2`} style={{ backgroundColor: budget.color }}></div>
                      <span>{budget.title}</span>
                    </div>
                    <div className="text-sm text-gray-500">${budget.limit.toLocaleString()}</div>
                  </div>
                ))}
                <Button className="w-full border-dashed border-2 border-royal-purple/30 hover:border-royal-purple">
                  Add New Category
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Button 
          onClick={handleSaveSettings} 
          type="submit" 
          className="w-full bg-royal-purple hover:bg-royal-darkPurple"
        >
          Save All Settings
        </Button>
      </div>
    </Layout>
  );
};

export default Settings;
