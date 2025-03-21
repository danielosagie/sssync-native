import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput,
  ActivityIndicator,
  Switch,
  Alert
} from 'react-native';
import { CameraView, CameraType, Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInUp, 
  SlideOutDown, 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue 
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import Card from '../components/Card';
import PlatformSelector from '../components/PlatformSelector';
import PlaceholderImage from '../components/PlaceholderImage';



const CameraSection = ({ onCapture, onClose }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [capturedImages, setCapturedImages] = useState([]);
  const cameraRef = useRef(null);
  const theme = useTheme();

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        
        setCapturedImages([...capturedImages, photo]);
      } catch (error) {
        console.log('Error taking picture', error);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });
    
    if (!result.canceled && result.assets) {
      const newImages = result.assets.map(asset => ({
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
      }));
      setCapturedImages([...capturedImages, ...newImages]);
    }
  };

  const saveAndClose = () => {
    onCapture(capturedImages);
    onClose();
  };

  const toggleCameraFacing = () => {
    setFacing(current => current === CameraType.back ? CameraType.front : CameraType.back);
  };

  if (!permission) {
    return (
      <View style={styles.cameraLoading}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.cameraLoadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.cameraLoading}>
        <Icon name="camera-off" size={40} color="#FF5252" />
        <Text style={styles.cameraErrorText}>No access to camera</Text>
        <Button 
          title="Grant Permission" 
          onPress={requestPermission} 
          style={{ marginTop: 16 }}
        />
        <Button 
          title="Go Back" 
          onPress={onClose} 
          outlined
          style={{ marginTop: 8 }}
        />
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.cameraOverlay}>
          <View style={styles.cameraBoundingBox}>
            <Text style={styles.cameraText}>
              Place your item here
            </Text>
          </View>
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.galleryButton}
              onPress={pickImage}
            >
              <Icon name="image-multiple" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
      
      {capturedImages.length > 0 && (
        <View style={styles.previewContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.previewScroll}
          >
            {capturedImages.map((img, index) => (
              <View key={index} style={styles.previewImageContainer}>
                <Image source={{ uri: img.uri }} style={styles.previewImage} />
                <TouchableOpacity 
                  style={styles.deleteImageButton}
                  onPress={() => {
                    const newImages = [...capturedImages];
                    newImages.splice(index, 1);
                    setCapturedImages(newImages);
                  }}
                >
                  <Icon name="close-circle" size={22} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          
          <TouchableOpacity 
            style={[styles.doneButton, { backgroundColor: theme.colors.primary }]}
            onPress={saveAndClose}
          >
            <Text style={styles.doneButtonText}>Done ({capturedImages.length})</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const SimilarProductsSuggestion = ({ productType }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  // Mock data for similar products
  const similarProducts = [
    {
      id: 1,
      title: 'Commercial Hot Dog Roller Grill',
      price: 144.99,
      platform: 'Amazon',
      seller: 'Kitchen Equipment Pro',
    },
    {
      id: 2,
      title: 'Hot Dog Steamer and Bun Warmer',
      price: 119.95,
      platform: 'eBay',
      seller: 'Restaurant Supplies',
    },
    {
      id: 3,
      title: 'Professional Hot Dog Warmer Machine',
      price: 159.99,
      platform: 'Shopify',
      seller: 'Food Equipment Store',
    }
  ];
  
  // Simulate loading
  useEffect(() => {
    if (productType) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [productType]);
  
  if (!productType) return null;
  
  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Shopify':
        return '#0E8F7F';
      case 'Amazon':
        return '#F17F5F';
      case 'eBay':
        return '#E53238';
      case 'Depop':
        return '#FF2300';
      case 'Whatnot':
        return '#FFC107';
      default:
        return '#555555';
    }
  };
  
  return (
    <Card style={styles.similarProductsCard}>
      <TouchableOpacity 
        style={styles.similarProductsHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.similarProductsHeaderLeft}>
          <Icon name="lightbulb-outline" size={20} color={theme.colors.primary} />
          <Text style={styles.similarProductsTitle}>Similar Products Found</Text>
        </View>
        <Icon 
          name={expanded ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#777" 
        />
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.similarProductsList}>
          {loading ? (
            <ActivityIndicator color={theme.colors.primary} style={styles.loadingIndicator} />
          ) : (
            similarProducts.map((product) => (
              <View key={product.id} style={styles.similarProductItem}>
                <PlaceholderImage
                  size={40}
                  borderRadius={4}
                  type="gradient"
                  icon="shopping"
                  color={getPlatformColor(product.platform)}
                />
                <View style={styles.similarProductInfo}>
                  <Text style={styles.similarProductTitle} numberOfLines={1}>{product.title}</Text>
                  <Text style={styles.similarProductMeta}>
                    ${product.price} on {product.platform}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={[styles.useThisButton, { backgroundColor: theme.colors.primary + '20' }]}
                >
                  <Text style={[styles.useThisButtonText, { color: theme.colors.primary }]}>
                    Use
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
          
          <TouchableOpacity 
            style={[styles.viewAllButton, { borderColor: theme.colors.primary }]}
          >
            <Text style={[styles.viewAllButtonText, { color: theme.colors.primary }]}>
              View All Similar Products
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
};

const PlatformPreview = ({ platform, data, images }) => {
  const theme = useTheme();
  
  return (
    <View style={[styles.platformPreview, { borderColor: getPlatformColor(platform) }]}>
      <View style={styles.previewHeader}>
        <Icon name={getPlatformIcon(platform)} size={24} color={getPlatformColor(platform)} />
        <Text style={[styles.previewPlatformTitle, { color: getPlatformColor(platform) }]}>
          {getPlatformName(platform)}
        </Text>
      </View>
      
      <View style={styles.previewBody}>
        <View style={styles.previewImageContainer}>
          {images && images.length > 0 ? (
            <Image source={{ uri: images[0] }} style={styles.previewProductImage} />
          ) : (
            <PlaceholderImage 
              size={120} 
              borderRadius={8}
              color={getPlatformColor(platform)}
              type="gradient"
              icon={getPlatformIcon(platform)}
            />
          )}
          {images && images.length > 1 && (
            <View style={styles.previewImageCount}>
              <Text style={styles.previewImageCountText}>+{images.length - 1}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.previewProductDetails}>
          <Text style={styles.previewProductTitle} numberOfLines={2}>
            {data.title || "Your Product Title"}
          </Text>
          <Text style={styles.previewProductPrice}>
            ${parseFloat(data.price || 0).toFixed(2)}
          </Text>
          <Text style={styles.previewProductDescription} numberOfLines={3}>
            {data.description || "Your product description will appear here."}
          </Text>
          
          <View style={styles.previewMeta}>
            <View style={styles.previewMetaBadge}>
              <Text style={styles.previewMetaBadgeText}>
                {data.quantity || 0} in stock
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const AddListingScreen = () => {
  const theme = useTheme();
  const [mode, setMode] = useState('initial'); // initial, camera, scanning, form
  const [images, setImages] = useState([]);
  const [listingData, setListingData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    condition: 'New',
    quantity: '1',
    brand: '',
    platforms: {
      shopify: true,
      amazon: true,
      clover: false,
      square: false,
    }
  });
  
  const [scanningProgress, setScanningProgress] = useState(0);
  const progressInterval = useRef(null);
  const cameraRef = useRef(null);
  const aiConfidence = useSharedValue(0);
  
  const aiConfidenceStyle = useAnimatedStyle(() => {
    return {
      width: `${aiConfidence.value * 100}%`,
    };
  });
  
  const [showRelatedProducts, setShowRelatedProducts] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedPreviewPlatform, setSelectedPreviewPlatform] = useState('shopify');
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [previewTab, setPreviewTab] = useState('shopify');
  
  const startAIAnalysis = () => {
    setMode('scanning');
    
    // Simulate AI processing with progress bar
    setScanningProgress(0);
    progressInterval.current = setInterval(() => {
      setScanningProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval.current);
          
          // Simulate AI filling in the form
          setTimeout(() => {
            setListingData({
              title: 'Vintage Caribbean Seafood Cookbook',
              price: '24.99',
              description: 'Authentic seafood recipes from the Caribbean, featuring traditional cooking methods and local ingredients. Hardcover, full color images, 212 pages.',
              category: 'Books & Media',
              condition: 'New',
              quantity: '45',
              brand: 'Atlantic Culinary Press',
              platforms: {
                shopify: true,
                amazon: true,
                clover: false,
                square: false,
              }
            });
            
            aiConfidence.value = withTiming(0.85, { duration: 800 });
            setMode('form');
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };
  
  const handleTakePicture = async () => {
    setMode('camera');
  };

  const handleCapturedImages = (capturedImages) => {
    const newImages = capturedImages.map(img => img.uri || img);
    setImages([...images, ...newImages]);
    setMode('form');
  };
  
  const publishListing = () => {
    // Simulate publishing with a success message
    Alert.alert(
      "Success!",
      "Your listing has been published to Shopify and Amazon. You can view and track it in your inventory.",
      [{ text: "OK", onPress: () => {
        setMode('initial');
        setImages([]);
        setListingData({
          title: '',
          price: '',
          description: '',
          category: '',
          condition: 'New',
          quantity: '1',
          brand: '',
          platforms: {
            shopify: true,
            amazon: true,
            clover: false,
            square: false,
          }
        });
      }}]
    );
  };
  
  const saveDraft = () => {
    const newDraft = {
      id: Date.now(),
      title: listingData.title,
      description: listingData.description,
      price: listingData.price,
      quantity: listingData.quantity,
      images: images,
      selectedPlatforms: Object.keys(listingData.platforms).filter(p => listingData.platforms[p]),
      createdAt: new Date().toISOString()
    };
    
    setSavedDrafts([...savedDrafts, newDraft]);
    
    Alert.alert(
      "Draft Saved",
      "Your listing has been saved as a draft",
      [{ text: "OK" }]
    );
  };
  
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  
  const renderContent = () => {
    switch (mode) {
      case 'initial':
        return (
          <Animated.View 
            entering={FadeIn.duration(400)} 
            style={styles.initialContainer}
          >
            <Icon name="camera-plus" size={80} color={theme.colors.primary} />
            <Text style={styles.initialText}>
              Add a new listing by taking a photo or uploading an image
            </Text>
            <View style={styles.buttonRow}>
              <Button 
                title="Take Photo" 
                icon="camera" 
                onPress={() => setMode('camera')} 
                style={styles.actionButton}
              />
              <Button 
                title="Upload Image" 
                icon="image" 
                onPress={() => setMode('camera')} 
                style={styles.actionButton}
                outlined
              />
            </View>
          </Animated.View>
        );
        
      case 'camera':
        return (
          <CameraSection
            onCapture={handleCapturedImages}
            onClose={() => setMode('initial')}
          />
        );
        
      case 'scanning':
        return (
          <Animated.View 
            entering={SlideInUp.duration(400)}
            style={styles.scanningContainer}
          >
            <View style={styles.imagePreviewContainer}>
              {images.map((uri, index) => (
                <Image 
                  key={index}
                  source={{ uri }}
                  style={styles.previewImage}
                />
              ))}
            </View>
            <Text style={styles.scanningTitle}>
              AI is analyzing your item...
            </Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <Animated.View 
                  style={[
                    styles.progressFill, 
                    { width: `${scanningProgress}%`, backgroundColor: theme.colors.primary }
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{scanningProgress}%</Text>
            </View>
            <Text style={styles.scanningSubtitle}>
              We're identifying product details and gathering information to create your listing
            </Text>
          </Animated.View>
        );
        
      case 'form':
        return (
          <Animated.View 
            entering={SlideInUp.duration(400)} 
            style={styles.formContainer}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.imagePreviewContainer}>
                {images.map((uri, index) => (
                  <Image 
                    key={index}
                    size={120}
                    source={{ uri }}
                    style={styles.previewImage}
                  />
                ))}
                <TouchableOpacity 
                  style={[styles.addImageButton, { borderColor: theme.colors.primary + '50' }]}
                  onPress={() => setMode('camera')}
                >
                  <Icon name="camera-plus" size={32} color={theme.colors.primary} />
                  <Text style={[styles.addImageText, { color: theme.colors.primary }]}>Add Photos</Text>
                </TouchableOpacity>
              </View>
              
              <Card>
                <View style={styles.aiConfidenceContainer}>
                  <Text style={styles.aiConfidenceText}>AI Confidence</Text>
                  <View style={styles.aiConfidenceBar}>
                    <Animated.View 
                      style={[
                        styles.aiConfidenceFill, 
                        aiConfidenceStyle, 
                        { backgroundColor: theme.colors.primary }
                      ]}
                    />
                  </View>
                  <Text style={styles.aiConfidenceValue}>85%</Text>
                </View>
              </Card>
              
              <Card>
                <Text style={styles.formSectionTitle}>Product Details</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Title</Text>
                  <TextInput
                    style={styles.input}
                    value={listingData.title}
                    onChangeText={(text) => setListingData({...listingData, title: text})}
                    placeholder="Product title"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Price</Text>
                  <TextInput
                    style={styles.input}
                    value={listingData.price}
                    onChangeText={(text) => setListingData({...listingData, price: text})}
                    placeholder="0.00"
                    keyboardType="decimal-pad"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Description</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={listingData.description}
                    onChangeText={(text) => setListingData({...listingData, description: text})}
                    placeholder="Describe your product..."
                    multiline
                    numberOfLines={4}
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Category</Text>
                  <TextInput
                    style={styles.input}
                    value={listingData.category}
                    onChangeText={(text) => setListingData({...listingData, category: text})}
                    placeholder="Category"
                  />
                </View>
                
                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, {flex: 1, marginRight: 8}]}>
                    <Text style={styles.inputLabel}>Condition</Text>
                    <TextInput
                      style={styles.input}
                      value={listingData.condition}
                      onChangeText={(text) => setListingData({...listingData, condition: text})}
                      placeholder="Condition"
                    />
                  </View>
                  
                  <View style={[styles.inputGroup, {flex: 1, marginLeft: 8}]}>
                    <Text style={styles.inputLabel}>Quantity</Text>
                    <TextInput
                      style={styles.input}
                      value={listingData.quantity}
                      onChangeText={(text) => setListingData({...listingData, quantity: text})}
                      placeholder="Quantity"
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Brand</Text>
                  <TextInput
                    style={styles.input}
                    value={listingData.brand}
                    onChangeText={(text) => setListingData({...listingData, brand: text})}
                    placeholder="Brand (optional)"
                  />
                </View>
              </Card>
              
              <Card>
                <Text style={styles.formSectionTitle}>Publish To</Text>
                <Text style={styles.formSectionSubtitle}>Select platforms where you want to list this product</Text>
                
                <PlatformSelector 
                  platforms={listingData.platforms}
                  onChange={(platforms) => setListingData({...listingData, platforms})}
                />
              </Card>
              
              <View style={styles.buttonRow}>
                <Button 
                  title="Save Draft" 
                  onPress={saveDraft} 
                  outlined
                  style={styles.draftButton}
                />
                <Button 
                  title={showPreview ? "Edit Listing" : "Preview Listing"} 
                  onPress={togglePreview} 
                  outlined
                  style={styles.previewButton}
                />
                <Button 
                  title="Publish Listing" 
                  onPress={publishListing} 
                  style={styles.submitButton}
                />
              </View>
            </ScrollView>
          </Animated.View>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      {renderContent()}
      {showPreview && (
        <View style={styles.previewSection}>
          <View style={styles.previewHeader}>
            <Text style={styles.previewTitle}>Preview Your Listing</Text>
            <TouchableOpacity 
              style={styles.closePreviewButton}
              onPress={() => setShowPreview(false)}
            >
              <Icon name="close" size={20} color="#777" />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.platformPreviewTabs}
          >
            {Object.keys(listingData.platforms)
              .filter(p => listingData.platforms[p])
              .map(platform => (
                <TouchableOpacity
                  key={platform}
                  style={[
                    styles.platformPreviewTab,
                    previewTab === platform && {
                      backgroundColor: getPlatformColor(platform) + '20',
                      borderColor: getPlatformColor(platform),
                      borderWidth: 1,
                    }
                  ]}
                  onPress={() => setPreviewTab(platform)}
                >
                  <Icon 
                    name={getPlatformIcon(platform)} 
                    size={16} 
                    color={previewTab === platform ? getPlatformColor(platform) : '#777'} 
                    style={styles.platformPreviewIcon}
                  />
                  <Text 
                    style={[
                      styles.platformPreviewText,
                      previewTab === platform && {color: getPlatformColor(platform)}
                    ]}
                  >
                    {getPlatformName(platform)}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
          
          <PlatformPreview 
            platform={previewTab} 
            data={listingData}
            images={images}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  initialText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginVertical: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
  },
  actionButton: {
    marginHorizontal: 8,
    minWidth: 150,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  cameraBoundingBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 24,
  },
  cancelButton: {
    padding: 16,
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  galleryButton: {
    padding: 16,
  },
  scanningContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 4,
  },
  scanningTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    width: 40,
    textAlign: 'right',
    fontSize: 14,
    color: '#555',
  },
  scanningSubtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  aiConfidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiConfidenceText: {
    fontSize: 14,
    color: '#555',
    width: 100,
  },
  aiConfidenceBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  aiConfidenceFill: {
    height: '100%',
  },
  aiConfidenceValue: {
    width: 40,
    textAlign: 'right',
    fontSize: 14,
    color: '#555',
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formSectionSubtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButtons: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  // Platform preview styles
  platformPreview: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  previewPlatformTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  previewBody: {
    flexDirection: 'row',
  },
  previewImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  previewProductImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  previewPlaceholderImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImageCount: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  previewImageCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  previewProductDetails: {
    flex: 1,
  },
  previewProductTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  previewProductPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0E8F7F',
    marginBottom: 8,
  },
  previewProductDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  previewMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  previewMetaBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  previewMetaBadgeText: {
    fontSize: 12,
    color: '#555',
  },
  previewMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  previewMetaText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
  },
  // Platform preview tabs
  platformPreviewTabs: {
    marginBottom: 16,
  },
  platformPreviewTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  platformPreviewIcon: {
    marginRight: 4,
  },
  platformPreviewText: {
    fontSize: 14,
    color: '#777',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  previewContent: {
    flex: 1,
  },
  previewSection: {
    marginTop: 24,
  },
  closePreviewButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
  // Other miscellanous styles
  cameraLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraLoadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 24,
  },
  cameraErrorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5252',
    marginTop: 24,
  },
});

export default AddListingScreen;