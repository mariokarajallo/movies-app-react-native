import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface YearFilterProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
}

const YearFilter = ({ selectedYear, onYearChange }: YearFilterProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Generar años desde 2024 hasta 1900
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => (currentYear - i).toString());

  const handleYearSelect = (year: string) => {
    onYearChange(year);
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="flex-row items-center rounded-lg bg-gray-800 px-3 py-2">
        <Ionicons name="calendar" size={16} color="white" />
        <Text className="ml-2 text-sm text-white">{selectedYear || 'Todos los años'}</Text>
        <Ionicons name="chevron-down" size={16} color="white" />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="max-h-96 w-80 rounded-lg bg-gray-900">
            {/* Header */}
            <View className="flex-row items-center justify-between border-b border-gray-700 p-4">
              <Text className="text-lg font-semibold text-white">Filtrar por año</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Year list */}
            <FlatList
              data={['Todos los años', ...years]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleYearSelect(item === 'Todos los años' ? '' : item)}
                  className={`border-b border-gray-700 p-4 ${
                    selectedYear === item || (!selectedYear && item === 'Todos los años')
                      ? 'bg-netflix-red'
                      : ''
                  }`}>
                  <Text
                    className={`text-base ${
                      selectedYear === item || (!selectedYear && item === 'Todos los años')
                        ? 'font-semibold text-white'
                        : 'text-gray-300'
                    }`}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default YearFilter;
