import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../components/Card';
import OrderListItem from '../components/OrderListItem';
import { mockOrders } from '../data/mockData';

const OrdersScreen = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Extended mock orders for a fuller list
  const extendedOrders = [...mockOrders, ...mockOrders.map((order, index) => ({
    ...order,
    id: `#${1189 + index}`,
  }))];
  
  const filteredOrders = extendedOrders.filter(order => {
    if (selectedTab !== 'All' && !order.platform.includes(selectedTab)) {
      return false;
    }
    
    if (selectedFilter !== 'All') {
      const status = selectedFilter.toLowerCase();
      if (status !== order.status.toLowerCase()) {
        return false;
      }
    }
    
    return true;
  });
  
  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.delay(100).duration(500)}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Orders</Text>
        
        <Card>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>256</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$8,392</Text>
              <Text style={styles.statLabel}>Total Revenue</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>14</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
        </Card>
        
        <Card>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScrollView}>
            <View style={styles.tabContainer}>
              {['All', 'Shopify', 'Amazon', 'Clover', 'Square'].map((tab) => (
                <TouchableOpacity 
                  key={tab}
                  style={[styles.tab, selectedTab === tab ? styles.selectedTab : null]}
                  onPress={() => setSelectedTab(tab)}
                >
                  <Text style={[
                    styles.tabText, 
                    selectedTab === tab ? { color: theme.colors.primary } : { color: theme.colors.textSecondary }
                  ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
            <View style={styles.filterContainer}>
              {['All', 'Delivered', 'In Transit', 'Returned', 'Off-Loaded'].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterChip,
                    selectedFilter === filter && { backgroundColor: theme.colors.primary }
                  ]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedFilter === filter && { color: 'white' }
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          
          <View style={styles.listHeader}>
            <Text style={[styles.listHeaderText, styles.idHeader]}>Order ID</Text>
            <Text style={[styles.listHeaderText, styles.salesHeader]}>Sales</Text>
            <Text style={[styles.listHeaderText, styles.statusHeader]}>Status</Text>
            <Text style={[styles.listHeaderText, styles.stockHeader]}>Stock</Text>
            <Text style={[styles.listHeaderText, styles.platformHeader]}>Platform</Text>
            <View style={styles.actionsHeader} />
          </View>

          {filteredOrders.map((order, index) => (
            <Animated.View 
              key={order.id} 
              entering={FadeInUp.delay(50 * index).duration(300)}
            >
              <OrderListItem order={order} />
            </Animated.View>
          ))}
          
          <View style={styles.paginationContainer}>
            <TouchableOpacity style={styles.paginationButton}>
              <Icon name="chevron-left" size={20} color="#777" />
            </TouchableOpacity>
            <Text style={styles.paginationText}>Page 1 of 4</Text>
            <TouchableOpacity style={styles.paginationButton}>
              <Icon name="chevron-right" size={20} color="#777" />
            </TouchableOpacity>
          </View>
        </Card>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#eee',
  },
  tabScrollView: {
    marginBottom: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    marginRight: 24,
  },
  tab: {
    marginRight: 24,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0E8F7F',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterScrollView: {
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 13,
    color: '#555',
  },
  listHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#777',
  },
  idHeader: {
    width: 100,
  },
  salesHeader: {
    width: 80,
  },
  statusHeader: {
    width: 100,
  },
  stockHeader: {
    width: 60,
  },
  platformHeader: {
    flex: 1,
  },
  actionsHeader: {
    width: 40,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  paginationButton: {
    padding: 8,
  },
  paginationText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#555',
  },
});

export default OrdersScreen; 