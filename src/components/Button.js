import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Button = ({ 
  title, 
  onPress, 
  outlined = false, 
  icon, 
  loading = false, 
  disabled = false,
  style, 
  textStyle 
}) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        outlined ? styles.outlinedButton : { backgroundColor: theme.colors.primary },
        outlined ? { borderColor: theme.colors.primary } : null,
        disabled ? styles.disabledButton : null,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={outlined ? theme.colors.primary : '#FFFFFF'} />
      ) : (
        <>
          {icon && (
            <Icon 
              name={icon} 
              size={18} 
              color={outlined ? theme.colors.primary : '#FFFFFF'} 
              style={styles.icon} 
            />
          )}
          <Text 
            style={[
              styles.buttonText, 
              outlined ? { color: theme.colors.primary } : { color: '#FFFFFF' },
              textStyle
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    minWidth: 100,
    flex: 1,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
  },
});

export default Button; 