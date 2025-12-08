"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { User, Lock, Bell, Settings as SettingsIcon, Save, Upload, Shield } from "lucide-react"

export default function SettingsPage() {
    const [loading, setLoading] = useState(false)

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            toast.success("Settings saved successfully")
        }, 1000)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList className="bg-slate-900/50 border border-slate-800 p-1 flex flex-wrap h-auto w-full sm:w-auto">
                    <TabsTrigger value="general" className="data-[state=active]:bg-indigo-600">
                        <User className="mr-2 h-4 w-4" /> General
                    </TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-purple-600">
                        <Shield className="mr-2 h-4 w-4" /> Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="data-[state=active]:bg-sky-600">
                        <Bell className="mr-2 h-4 w-4" /> Notifications
                    </TabsTrigger>
                    <TabsTrigger value="system" className="data-[state=active]:bg-emerald-600">
                        <SettingsIcon className="mr-2 h-4 w-4" /> System
                    </TabsTrigger>
                </TabsList>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* General Settings */}
                    <TabsContent value="general">
                        <Card className="bg-slate-900/50 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white">Profile Information</CardTitle>
                                <CardDescription className="text-slate-400">
                                    Update your profile details and public information.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-24 w-24 border-4 border-slate-800">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                                        <Upload className="mr-2 h-4 w-4" /> Change Avatar
                                    </Button>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                                        <Input id="name" defaultValue="Admin User" className="bg-slate-950/50 border-slate-800 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-slate-300">Email</Label>
                                        <Input id="email" defaultValue="admin@example.com" className="bg-slate-950/50 border-slate-800 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="text-slate-300">Bio</Label>
                                    <Textarea id="bio" placeholder="Tell us about yourself" className="bg-slate-950/50 border-slate-800 text-white min-h-[100px]" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSave} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
                                    {loading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Security Settings */}
                    <TabsContent value="security">
                        <Card className="bg-slate-900/50 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white">Security Settings</CardTitle>
                                <CardDescription className="text-slate-400">
                                    Manage your password and security preferences.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password" className="text-slate-300">Current Password</Label>
                                        <Input id="current-password" type="password" className="bg-slate-950/50 border-slate-800 text-white" />
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password" className="text-slate-300">New Password</Label>
                                            <Input id="new-password" type="password" className="bg-slate-950/50 border-slate-800 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password" className="text-slate-300">Confirm Password</Label>
                                            <Input id="confirm-password" type="password" className="bg-slate-950/50 border-slate-800 text-white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 border border-slate-800 rounded-lg bg-slate-950/30">
                                    <div className="space-y-0.5">
                                        <Label className="text-base text-white">Two-factor Authentication</Label>
                                        <p className="text-sm text-slate-400">Add an extra layer of security to your account.</p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSave} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
                                    {loading ? "Saving..." : "Update Password"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Notifications Settings */}
                    <TabsContent value="notifications">
                        <Card className="bg-slate-900/50 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white">Notifications</CardTitle>
                                <CardDescription className="text-slate-400">
                                    Choose what you want to be notified about.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-white">Email Notifications</Label>
                                            <p className="text-sm text-slate-400">Receive emails about your account activity.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-white">Push Notifications</Label>
                                            <p className="text-sm text-slate-400">Receive push notifications on your device.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-white">Marketing Emails</Label>
                                            <p className="text-sm text-slate-400">Receive emails about new features and updates.</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSave} disabled={loading} className="bg-sky-600 hover:bg-sky-700">
                                    {loading ? "Saving..." : "Save Preferences"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* System Settings */}
                    <TabsContent value="system">
                        <Card className="bg-slate-900/50 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white">System Settings</CardTitle>
                                <CardDescription className="text-slate-400">
                                    Manage system-wide configurations.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-red-900/30 rounded-lg bg-red-950/10">
                                        <div className="space-y-0.5">
                                            <Label className="text-red-400">Maintenance Mode</Label>
                                            <p className="text-sm text-red-300/70">Disable the site for visitors.</p>
                                        </div>
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-white">Debug Mode</Label>
                                            <p className="text-sm text-slate-400">Enable detailed error logging.</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSave} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
                                    {loading ? "Saving..." : "Save Configuration"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </motion.div>
            </Tabs>
        </div>
    )
}
