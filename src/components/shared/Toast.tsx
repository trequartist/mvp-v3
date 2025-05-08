import React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: AlertCircle
};

const colors = {
  success: 'bg-green-50 border-green-100 text-green-800',
  error: 'bg-red-50 border-red-100 text-red-800',
  info: 'bg-blue-50 border-blue-100 text-blue-800'
};

const iconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  info: 'text-blue-500'
};

const Toast: React.FC<ToastProps> = ({
  open,
  onOpenChange,
  title,
  description,
  type = 'info',
  duration = 5000
}) => {
  const Icon = icons[type];

  return (
    <ToastPrimitive.Provider>
      <AnimatePresence>
        {open && (
          <ToastPrimitive.Root
            open={open}
            onOpenChange={onOpenChange}
            duration={duration}
            asChild
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`
                fixed bottom-4 right-4 z-50 flex items-start gap-3 p-4 rounded-lg border shadow-lg
                ${colors[type]}
              `}
            >
              <Icon className={`w-5 h-5 mt-0.5 ${iconColors[type]}`} />
              
              <div className="flex-1 min-w-0">
                <ToastPrimitive.Title className="font-medium">
                  {title}
                </ToastPrimitive.Title>
                {description && (
                  <ToastPrimitive.Description className="text-sm mt-1 opacity-90">
                    {description}
                  </ToastPrimitive.Description>
                )}
              </div>

              <ToastPrimitive.Close className="p-1 hover:bg-black/5 rounded transition-colors">
                <X className="w-4 h-4" />
              </ToastPrimitive.Close>
            </motion.div>
          </ToastPrimitive.Root>
        )}
      </AnimatePresence>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
};

export default Toast;