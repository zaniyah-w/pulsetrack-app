import React, { useRef } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface GymLocation {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

// TODO: add more gyms
const GYM_LOCATIONS: GymLocation[] = [
  { id: '1', name: 'Big Work Fitness Club', description: 'Highly rated facility.', latitude: 32.80821412484942, longitude: -79.94408402528514 },
  { id: '2', name: 'George Street Wellness Center', description: 'Free for COFC students.', latitude: 32.78603321173778, longitude: -79.9327777510338 },
  { id: '3', name: 'MUSC Wellness Center', description: 'Available to public, pool included.', latitude: 32.78686929747912, longitude: -79.94679140953232 }
];

const CHARLESTON_CENTER = {
  latitude: 32.78,
  longitude: -79.93,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const gymMap = () => {
  const mapRef = useRef<MapView>(null)


  const recenterMap = () => {
    mapRef.current?.animateToRegion(CHARLESTON_CENTER, 1000);
  }

  return (
    <View style={styles.container}>

        <MapView
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_GOOGLE}
          initialRegion={CHARLESTON_CENTER}
          ref={mapRef}
        >
          {GYM_LOCATIONS.map((items) => 
            <Marker coordinate={items} key={items.id}>
              <Callout tooltip={true} onPress={() => Alert.alert(`Clicked ${items.name}`)}>
                <View></View>
              </Callout>
            </Marker>
          )}
        </MapView>



      <View style={styles.floatingButtonContainer}>
        
        <TouchableOpacity style={styles.actionButton} onPress={recenterMap}>
          <Text style={styles.actionButtonText}>Recenter</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity style={[styles.actionButton, styles.bonusButton]}>
          <Text style={styles.actionButtonText}>Fit All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default gymMap;


// TODO: replace colors with a unique color scheme and icons
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calloutCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    width: 200,
    elevation: 4, 
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  calloutDesc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  fakeButton: {
    backgroundColor: "#800000",
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: "center",
  },
  fakeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 40,
    right: 20,
    gap: 10, 
  },
  actionButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
  },
  bonusButton: {
    backgroundColor: "#007AFF", 
  },
  actionButtonText: {
    fontWeight: "bold",
    color: "#333",
  },
});