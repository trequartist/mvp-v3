import React from 'react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { availableModels } from '../../store';

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ value, onChange }) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className="inline-flex items-center justify-between w-full px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center gap-2">
          <img
            src={availableModels.find(m => m.id === value)?.icon}
            alt="Model"
            className="w-4 h-4"
          />
          <Select.Value />
        </div>
        <Select.Icon>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="overflow-hidden bg-white rounded-lg shadow-lg border animate-in fade-in-80"
        >
          <Select.Viewport className="p-1">
            {availableModels.map((model) => (
              <Select.Item
                key={model.id}
                value={model.id}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer outline-none"
              >
                <img src={model.icon} alt={model.provider} className="w-4 h-4" />
                <div className="flex-1">
                  <p className="font-medium">{model.name}</p>
                  <p className="text-xs text-gray-500">{model.description}</p>
                </div>
                <Select.ItemIndicator>
                  <Check className="w-4 h-4 text-blue-500" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default ModelSelector;