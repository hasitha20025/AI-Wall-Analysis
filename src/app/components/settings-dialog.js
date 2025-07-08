"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SettingsDialog({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [settings, setSettings] = useState({
    cement: 1800,
    sand: 9000,
    water: 15,
    putty: 400,
    paint: 600,
    laborCost: 3500,
  });

  // Ensure component is mounted before accessing localStorage
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Client-side only check to prevent hydration mismatches
  const isClient = typeof window !== 'undefined';

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Convert string values to numbers where appropriate
    const numericSettings = {
      cement: parseFloat(settings.cement) || 1800,
      sand: parseFloat(settings.sand) || 9000,
      water: parseFloat(settings.water) || 15,
      putty: parseFloat(settings.putty) || 400,
      paint: parseFloat(settings.paint) || 600,
      laborCost: parseFloat(settings.laborCost) || 3500,
    };
    
    // Store in localStorage for persistence (only if mounted and on client)
    if (isMounted && isClient) {
      localStorage.setItem('wallAnalysisSettings', JSON.stringify(numericSettings));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: numericSettings }));
    }
    
    setIsOpen(false);
  };

  const handleReset = () => {
    // Reset to default values
    setSettings({
      cement: 1800,
      sand: 9000,
      water: 15,
      putty: 400,
      paint: 600,
      laborCost: 3500,
    });
    
    // Optional: Show confirmation that values were reset
    // You could add a toast notification here if needed
  };

  // Load settings from localStorage when dialog opens
  React.useEffect(() => {
    if (isOpen && isMounted && isClient) {
      const savedSettings = localStorage.getItem('wallAnalysisSettings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSettings({
            cement: parsed.cement?.toString() || "1800",
            sand: parsed.sand?.toString() || "9000",
            water: parsed.water?.toString() || "15",
            putty: parsed.putty?.toString() || "400",
            paint: parsed.paint?.toString() || "600",
            laborCost: parsed.laborCost?.toString() || "3500",
          });
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      }
    }
  }, [isOpen, isMounted, isClient]);

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-lg shadow-lg border-0">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Material Cost Settings
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-2">
            Configure the material and labor costs for damage repair calculations. All costs are in LKR.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="cement" className="text-sm font-semibold text-gray-900">
              Cement 50KG Bage Price
            </Label>
            <Input
              id="cement"
              type="number"
              step="2000"
              placeholder="2,000"
              value={settings.cement}
              onChange={(e) => handleInputChange('cement', e.target.value)}
              className="w-full border border-gray-300 rounded-md bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sand" className="text-sm font-semibold text-gray-900">
              Sand 100cft (Cube) Price
            </Label>
            <Input
              id="sand"
              type="number"
              step="100"
              placeholder="9,000"
              value={settings.sand}
              onChange={(e) => handleInputChange('sand', e.target.value)}
              className="w-full border border-gray-300 rounded-md bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="water" className="text-sm font-semibold text-gray-900">
              Water 1L Price
            </Label>
            <Input
              id="water"
              type="number"
              step="10"
              placeholder="20"
              value={settings.water}
              onChange={(e) => handleInputChange('water', e.target.value)}
              className="w-full border border-gray-300 rounded-md bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="putty" className="text-sm font-semibold text-gray-900">
              Putty 1KG Price
            </Label>
            <Input
              id="putty"
              type="number"
              step="100"
              placeholder="500"
              value={settings.putty}
              onChange={(e) => handleInputChange('putty', e.target.value)}
              className="w-full border border-gray-300 rounded-md bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paint" className="text-sm font-semibold text-gray-900">
              Paint 1L Price
            </Label>
            <Input
              id="paint"
              type="number"
              step="100"
              placeholder="600"
              value={settings.paint}
              onChange={(e) => handleInputChange('paint', e.target.value)}
              className="w-full border border-gray-300 rounded-md bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="laborCost" className="text-sm font-semibold text-gray-900">
              Labor Cost
            </Label>
            <Input
              id="laborCost"
              type="number"
              step="1000"
              placeholder="3,500"
              value={settings.laborCost}
              onChange={(e) => handleInputChange('laborCost', e.target.value)}
              className="w-full border border-gray-300 rounded-md bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2"
            />
          </div>
        </div>
        
        <DialogFooter className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md px-4 py-2"
            >
              Cancel
            </Button>

          <Button 
            type="button" 
            variant="outline" 
            onClick={handleReset}
            className="border border-red-300 text-red-700 bg-white hover:bg-red-50 rounded-md px-4 py-2"
          >
            Reset to Defaults
          </Button>
            <Button 
              type="button" 
              onClick={handleSave}
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-md px-4 py-2 border-0"
            >
              Save changes
            </Button>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
