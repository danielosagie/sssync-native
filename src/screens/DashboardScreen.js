import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import ChannelSalesBar from '../components/ChannelSalesBar';
import OrderListItem from '../components/OrderListItem';
import { mockSalesData, mockOrders, mockChannelData } from '../data/mockData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardScreen = () => {
  const theme = useTheme();
  const [timeFrame, setTimeFrame] = useState('12 months');
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  
  return (
    <View style={styles.fullScreenContainer} paddingTop={60}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.delay(100).duration(500)}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Icon name="magnify" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                placeholder="Search inventory, orders, or marketplaces"
                style={styles.searchInput}
              />
            </View>
          </View>

          {/* Alerts Section */}
          <Card style={styles.alertsCard}>
            <View style={styles.alertsHeader}>
              <Text style={styles.alertsTitle}>Alerts</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.alertItem}>
              <View style={[styles.alertIcon, { backgroundColor: '#FF9500' + '20' }]}>
                <Icon name="alert" size={18} color="#FF9500" />
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertText}>Low stock on 3 products</Text>
                <Text style={styles.alertTime}>2 hours ago</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#CCC" />
            </View>
            
            <View style={styles.alertItem}>
              <View style={[styles.alertIcon, { backgroundColor: '#34C759' + '20' }]}>
                <Icon name="check-circle" size={18} color="#34C759" />
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertText}>5 new orders received</Text>
                <Text style={styles.alertTime}>Today</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#CCC" />
            </View>
          </Card>

          {/* Sales Overview Card */}
          <Card style={styles.salesCard}>
            <Text style={[styles.totalAmount, {textAlign: 'left'}]}>$47,405.84</Text>
            <Text style={[styles.subtitle, {textAlign: 'left'}]}>Your total sales from the last {timeFrame}</Text>
            <View style={[styles.statsRow, {justifyContent: 'flex-start'}]}>
              <Text style={styles.statsPositive}>+$391.20 vs previous year</Text>
            </View>
            
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{ data: mockSalesData }]
              }}
              width={Dimensions.get('window').width - 48}
              height={180}
              chartConfig={{
                backgroundColor: theme.colors.background,
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                decimalPlaces: 0,
                color: () => theme.colors.primary,
                labelColor: () => theme.colors.textSecondary,
                propsForDots: {
                  r: '0',
                },
                propsForBackgroundLines: {
                  strokeDasharray: '',
                  stroke: '#e3e3e3',
                  strokeWidth: 1
                },
                propsForLabels: {
                  fontSize: 10,
                }
              }}
              bezier
              style={styles.chart}
            />
          </Card>

          {/* Order Summary */}
          <Card>
            <Text style={[styles.sectionTitle, {marginBottom: 16}]}>Order Summary</Text>
            
            {/* Platform Filter Tabs */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.platformTabsContainer}
            >
              <TouchableOpacity
                style={[
                  styles.platformTab, 
                  selectedPlatform === 'All' && 
                    { backgroundColor: theme.colors.primary + '20' }
                ]}
                onPress={() => setSelectedPlatform('All')}
              >
                <Text
                  style={[
                    styles.platformTabText,
                    { color: selectedPlatform === 'All' ? theme.colors.primary : theme.colors.text }
                  ]}
                >
                  All Platforms
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.platformTab, 
                  selectedPlatform === 'Shopify' && 
                    { backgroundColor: theme.colors.primary + '20' }
                ]}
                onPress={() => setSelectedPlatform('Shopify')}
              >
                <Text
                  style={[
                    styles.platformTabText,
                    { color: selectedPlatform === 'Shopify' ? theme.colors.primary : theme.colors.text }
                  ]}
                >
                  Shopify
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.platformTab, 
                  selectedPlatform === 'Amazon' && 
                    { backgroundColor: theme.colors.primary + '20' }
                ]}
                onPress={() => setSelectedPlatform('Amazon')}
              >
                <Text
                  style={[
                    styles.platformTabText,
                    { color: selectedPlatform === 'Amazon' ? theme.colors.primary : theme.colors.text }
                  ]}
                >
                  Amazon
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.platformTab, 
                  selectedPlatform === 'eBay' && 
                    { backgroundColor: theme.colors.primary + '20' }
                ]}
                onPress={() => setSelectedPlatform('eBay')}
              >
                <Text
                  style={[
                    styles.platformTabText,
                    { color: selectedPlatform === 'eBay' ? theme.colors.primary : theme.colors.text }
                  ]}
                >
                  eBay
                </Text>
              </TouchableOpacity>
            </ScrollView>
            
            {/* Status Filter Tabs - Keep existing status tabs */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.statusTabsContainer}
            >
              <TouchableOpacity
                style={[styles.tab, selectedTab === 'All' && styles.selectedTab]}
                onPress={() => setSelectedTab('All')}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: selectedTab === 'All' ? theme.colors.primary : theme.colors.text }
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, selectedTab === 'Pending' && styles.selectedTab]}
                onPress={() => setSelectedTab('Pending')}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: selectedTab === 'Pending' ? theme.colors.primary : theme.colors.text }
                  ]}
                >
                  Pending
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, selectedTab === 'Completed' && styles.selectedTab]}
                onPress={() => setSelectedTab('Completed')}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: selectedTab === 'Completed' ? theme.colors.primary : theme.colors.text }
                  ]}
                >
                  Completed
                </Text>
              </TouchableOpacity>
            </ScrollView>
            
            {/* Order list - filtered by both platform and status */}
            {mockOrders
              .filter(order => selectedPlatform === 'All' || order.platform === selectedPlatform)
              .filter(order => selectedTab === 'All' || order.status === selectedTab.toLowerCase())
              .slice(0, 3)
              .map((order, index) => (
                <OrderListItem key={order.id} order={order} />
              ))
            }
            
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={[styles.viewAllButtonText, { color: theme.colors.primary }]}>
                View All Orders
              </Text>
            </TouchableOpacity>
          </Card>

          {/* Channel Sales Card */}
          <Card style={styles.channelSalesCard}>
            <Text style={styles.sectionTitle}>Total Sales By Channel</Text>
            <Text style={styles.dateRange}>January - Dec 2024</Text>
            
            {mockChannelData.map((channel, index) => (
              <ChannelSalesBar 
                key={channel.name}
                channel={channel}
                delay={index * 100}
              />
            ))}
            
            <View style={styles.statsRow}>
              <Text style={[styles.statsInfo, {flex: 1, flexWrap: 'wrap'}]}>Trending up by 5.2% this year</Text>
            </View>
            <Text style={[styles.statsInfo, {flex: 1, flexWrap: 'wrap'}]}>Showing sales by channel for the last 12 months</Text>
          </Card>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1, 
    backgroundColor: '#F8F9FB',
  },
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
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
    textAlign: 'left',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'flex-start',
  },
  statsPositive: {
    color: '#28a745',
    fontSize: 14,
  },
  statsInfo: {
    color: '#777',
    fontSize: 12,
    marginRight: 8,
    flexWrap: 'wrap',
    flex: 1,
  },
  chart: {
    marginVertical: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    paddingLeft: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 14,
    color: '#777',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    marginRight: 16,
    paddingVertical: 4,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0E8F7F',
  },
  tabText: {
    fontSize: 14,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
  },
  alertsCard: {
    marginBottom: 16,
  },
  alertsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    color: '#0E8F7F',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertText: {
    fontSize: 14,
    fontWeight: '500',
  },
  alertTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  salesCard: {
    marginBottom: 16,
  },
  channelSalesCard: {
    marginBottom: 16,
  },
  viewAllButton: {
    alignItems: 'center',
    padding: 12,
  },
  viewAllButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  platformTabsContainer: {
    marginBottom: 8,
  },
  platformTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  selectedPlatformTab: {
    backgroundColor: '#0E8F7F20',
  },
  platformTabText: {
    fontSize: 13,
    fontWeight: '500',
  },
  statusTabsContainer: {
    marginBottom: 16,
  },
});

export default DashboardScreen; 