import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  cancelText?: string;
  actionText?: string;
  onAction?: () => void;
  destructive?: boolean;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  cancelText = 'Cancel',
  actionText = 'Continue',
  onAction,
  destructive = false
}) => {
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <AlertDialogPrimitive.Portal forceMount>
            <AlertDialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              />
            </AlertDialogPrimitive.Overlay>

            <AlertDialogPrimitive.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
              >
                <div className="bg-white rounded-xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${destructive ? 'bg-red-100' : 'bg-amber-100'}`}>
                      <AlertTriangle className={`w-5 h-5 ${destructive ? 'text-red-600' : 'text-amber-600'}`} />
                    </div>
                    <AlertDialogPrimitive.Title className="text-lg font-semibold">
                      {title}
                    </AlertDialogPrimitive.Title>
                  </div>

                  <AlertDialogPrimitive.Description className="text-gray-600 mb-6">
                    {description}
                  </AlertDialogPrimitive.Description>

                  <div className="flex justify-end gap-3">
                    <AlertDialogPrimitive.Cancel asChild>
                      <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        {cancelText}
                      </button>
                    </AlertDialogPrimitive.Cancel>
                    <AlertDialogPrimitive.Action asChild>
                      <button
                        onClick={onAction}
                        className={`
                          px-4 py-2 text-white rounded-lg transition-colors
                          ${destructive 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-amber-500 hover:bg-amber-600'
                          }
                        `}
                      >
                        {actionText}
                      </button>
                    </AlertDialogPrimitive.Action>
                  </div>
                </div>
              </motion.div>
            </AlertDialogPrimitive.Content>
          </AlertDialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </AlertDialogPrimitive.Root>
  );
};

export default AlertDialog;