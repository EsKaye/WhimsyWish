import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { MotiView } from 'moti';
import { TradeTokenType } from '../../types/trade';
import { RitualAnimation } from '../../components/ritual/RitualAnimation';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/navigation';

const TOKEN_TYPES: { type: TradeTokenType; icon: string; label: string }[] = [
  { type: 'SOUL_FRAGMENT', icon: '🩸', label: 'Soul Fragment' },
  { type: 'CREATIVE_OFFERING', icon: '🎨', label: 'Creative Offering' },
  { type: 'RITUAL_SERVICE', icon: '🕯', label: 'Ritual Service' },
  { type: 'TIME_PLEDGE', icon: '🕰', label: 'Time Pledge' },
  { type: 'EMOTIONAL_ENERGY', icon: '💋', label: 'Emotional Energy' },
  { type: 'SECRET_SCROLL', icon: '📜', label: 'Secret Scroll' },
  { type: 'MYTHIC_OATH', icon: '🐉', label: 'Mythic Oath' },
  { type: 'FLESH_TITHE', icon: '🦴', label: 'Flesh Tithe' },
];

export const CreateWishScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [selectedTokenType, setSelectedTokenType] = useState<TradeTokenType | null>(null);
  const [offerDescription, setOfferDescription] = useState('');
  const [value, setValue] = useState('');
  const [showRitual, setShowRitual] = useState(false);

  const handleSubmit = () => {
    setShowRitual(true);
  };

  const handleRitualComplete = () => {
    setShowRitual(false);
    // TODO: Implement wish creation logic
    console.log({
      title,
      description,
      desiredOutcome,
      offer: {
        tokenType: selectedTokenType,
        description: offerDescription,
        value: parseInt(value, 10),
      },
    });
    navigation.goBack();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView}>
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <Text style={styles.sectionTitle}>Your Wish</Text>
            <TextInput
              style={styles.input}
              placeholder="What do you desire?"
              placeholderTextColor="#666"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your wish in detail..."
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />

            <TextInput
              style={styles.input}
              placeholder="What is your desired outcome?"
              placeholderTextColor="#666"
              value={desiredOutcome}
              onChangeText={setDesiredOutcome}
            />

            <Text style={styles.sectionTitle}>Your Offering</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.tokenTypeScroll}
            >
              {TOKEN_TYPES.map(({ type, icon, label }) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.tokenTypeButton,
                    selectedTokenType === type && styles.selectedTokenType,
                  ]}
                  onPress={() => setSelectedTokenType(type)}
                >
                  <Text style={styles.tokenIcon}>{icon}</Text>
                  <Text style={styles.tokenLabel}>{label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe what you're offering..."
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              value={offerDescription}
              onChangeText={setOfferDescription}
            />

            <TextInput
              style={styles.input}
              placeholder="Value (in energy units)"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={value}
              onChangeText={setValue}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Seal the Pact</Text>
            </TouchableOpacity>
          </MotiView>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={showRitual}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRitual(false)}
      >
        <RitualAnimation onComplete={handleRitualComplete} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginTop: 24,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 16,
    color: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  tokenTypeScroll: {
    marginBottom: 16,
  },
  tokenTypeButton: {
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 100,
  },
  selectedTokenType: {
    backgroundColor: '#ff4444',
  },
  tokenIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  tokenLabel: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#ff4444',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 