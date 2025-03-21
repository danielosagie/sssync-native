import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';

const OrderListItem = ({ order }) => {
  const theme = useTheme();
  
  // Helper function to safely check status
  const getStatusColor = (status) => {
    if (!status) return '#999'; // Default gray if status is undefined
    
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('pending')) return '#FF9500';
    if (statusLower.includes('processing')) return '#0E8F7F';
    if (statusLower.includes('intransit') || statusLower.includes('in transit')) return '#007AFF';
    if (statusLower.includes('delivered') || statusLower.includes('completed')) return '#34C759';
    if (statusLower.includes('returned')) return '#FF3B30';
    if (statusLower.includes('offloaded') || statusLower.includes('off-loaded')) return '#5856D6';
    
    return '#999'; // Default gray
  };
  
  // Helper function to get status icon
  const getStatusIcon = (status) => {
    if (!status) return 'help-circle-outline'; // Default icon if status is undefined
    
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('pending')) return 'timer-sand';
    if (statusLower.includes('processing')) return 'progress-check';
    if (statusLower.includes('intransit') || statusLower.includes('in transit')) return 'truck-delivery';
    if (statusLower.includes('delivered') || statusLower.includes('completed')) return 'check-circle';
    if (statusLower.includes('returned')) return 'keyboard-return';
    if (statusLower.includes('offloaded') || statusLower.includes('off-loaded')) return 'package-variant';
    
    return 'help-circle-outline'; // Default icon
  };
  
  // Get platform icon
  const getPlatformIcon = (platform) => {
    if (!platform) return 'store-outline'; // Default icon if platform is undefined
    
    const platformLower = platform.toLowerCase();
    
    if (platformLower.includes('shopify')) return 'shopping';
    if (platformLower.includes('amazon')) return 'cart';
    if (platformLower.includes('ebay')) return 'tag';
    if (platformLower.includes('clover')) return 'flower';
    if (platformLower.includes('square')) return 'square';
    if (platformLower.includes('etsy')) return 'hand-heart';
    if (platformLower.includes('facebook')) return 'facebook';
    
    return 'store-outline'; // Default icon
  };
  
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.orderInfo}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Order {order.id || 'Unknown'}</Text>
          <Text style={styles.orderDate}>{order.date || 'No date'}</Text>
        </View>
        
        <View style={styles.customerRow}>
          <Text style={styles.customerName}>{order.customer || 'Unknown customer'}</Text>
          <Text style={styles.orderItems}>
            {order.items ? `${order.items} item${order.items > 1 ? 's' : ''}` : ''}
          </Text>
        </View>
        
        <View style={styles.orderFooter}>
          <View style={styles.platformBadge}>
            <Icon 
              name={getPlatformIcon(order.platform)} 
              size={14} 
              color="#555" 
              style={styles.platformIcon} 
            />
            <Text style={styles.platformName}>{order.platform || 'Unknown'}</Text>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
            <Icon 
              name={getStatusIcon(order.status)} 
              size={14} 
              color={getStatusColor(order.status)} 
              style={styles.statusIcon} 
            />
            <Text 
              style={[styles.statusText, { color: getStatusColor(order.status) }]}
            >
              {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown'}
            </Text>
          </View>
          
          <Text style={styles.orderTotal}>${order.total ? order.total.toFixed(2) : '0.00'}</Text>
        </View>
      </View>
      
      <Icon name="chevron-right" size={20} color="#CCC" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderInfo: {
    flex: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 13,
    color: '#777',
  },
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 14,
  },
  orderItems: {
    fontSize: 13,
    color: '#777',
  },
  orderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  platformIcon: {
    marginRight: 4,
  },
  platformName: {
    fontSize: 12,
    color: '#555',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
});

export default OrderListItem; 
