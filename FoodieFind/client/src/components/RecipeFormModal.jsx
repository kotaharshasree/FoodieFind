import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Save,
  Clock,
  Users,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { recipeService } from '../services/api';
import { sampleFoodImages } from '../data/sampleIngredients';

const defaultForm = {
  name: '',
  description: '',
  image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80',
  category: 'Lunch',
  cookingTime: 25,
  preparationTime: 10,
  difficulty: 'Easy',
  servings: 2,
  isVegetarian: true,
  ingredients: [
    { name: '', quantity: 1, unit: '' },
    { name: '', quantity: 1, unit: '' },
  ],
  instructions: [''],
};

const RecipeFormModal = ({ isOpen, onClose, recipeToEdit = null, onSuccess }) => {
  const [formData, setFormData] = useState(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(defaultForm.image);

  useEffect(() => {
    if (recipeToEdit) {
      setFormData({
        name: recipeToEdit.name || '',
        description: recipeToEdit.description || '',
        image: recipeToEdit.image || defaultForm.image,
        category: recipeToEdit.category || 'Lunch',
        cookingTime: recipeToEdit.cookingTime || 25,
        preparationTime: recipeToEdit.preparationTime || 10,
        difficulty: recipeToEdit.difficulty || 'Easy',
        servings: recipeToEdit.servings || 2,
        isVegetarian: recipeToEdit.isVegetarian !== undefined ? recipeToEdit.isVegetarian : true,
        ingredients:
          recipeToEdit.ingredients && recipeToEdit.ingredients.length > 0
            ? recipeToEdit.ingredients.map((i) => ({
                name: i.name || '',
                quantity: i.quantity || 1,
                unit: i.unit || '',
              }))
            : [{ name: '', quantity: 1, unit: '' }],
        instructions:
          recipeToEdit.instructions && recipeToEdit.instructions.length > 0
            ? [...recipeToEdit.instructions]
            : [''],
      });
      setImagePreview(recipeToEdit.image || defaultForm.image);
    } else {
      setFormData(defaultForm);
      setImagePreview(defaultForm.image);
    }
  }, [recipeToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle simple input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'image') {
      setImagePreview(value);
    }
  };

  // Ingredient dynamic field handlers
  const handleIngredientChange = (index, field, value) => {
    const updated = [...formData.ingredients];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, ingredients: updated }));
  };

  const addIngredientRow = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: 1, unit: '' }],
    }));
  };

  const removeIngredientRow = (index) => {
    if (formData.ingredients.length <= 1) {
      toast.error('At least one ingredient is required');
      return;
    }
    const updated = formData.ingredients.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, ingredients: updated }));
  };

  // Instruction dynamic step handlers
  const handleInstructionChange = (index, value) => {
    const updated = [...formData.instructions];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, instructions: updated }));
  };

  const addInstructionStep = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ''],
    }));
  };

  const removeInstructionStep = (index) => {
    if (formData.instructions.length <= 1) {
      toast.error('At least one cooking instruction step is required');
      return;
    }
    const updated = formData.instructions.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, instructions: updated }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim()) {
      toast.error('Recipe name is required');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Recipe description is required');
      return;
    }

    const validIngredients = formData.ingredients.filter((i) => i.name.trim().length > 0);
    if (validIngredients.length === 0) {
      toast.error('Please specify at least one valid ingredient');
      return;
    }

    const validInstructions = formData.instructions.filter((s) => s.trim().length > 0);
    if (validInstructions.length === 0) {
      toast.error('Please specify at least one valid cooking instruction step');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        cookingTime: Number(formData.cookingTime) || 20,
        preparationTime: Number(formData.preparationTime) || 10,
        servings: Number(formData.servings) || 2,
        ingredients: validIngredients,
        instructions: validInstructions,
      };

      if (recipeToEdit && recipeToEdit._id) {
        await recipeService.updateRecipe(recipeToEdit._id, payload);
        toast.success(`"${formData.name}" updated successfully!`);
      } else {
        await recipeService.createRecipe(payload);
        toast.success(`"${formData.name}" added to FoodieFind!`);
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Save recipe error:', error);
      toast.error(error.response?.data?.message || 'Failed to save recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-3xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-[#FED7AA]"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#FED7AA]/60 flex items-center justify-between bg-[#FFF8F0]">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#292524]">
              {recipeToEdit ? 'Edit Recipe' : 'Add Your Delicious Recipe'}
            </h2>
            <p className="text-xs text-[#78716C] mt-0.5">
              Share your culinary discovery with FoodieFind
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-orange-100 text-[#78716C] hover:text-[#EA580C] flex items-center justify-center border border-[#FED7AA] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Recipe Name */}
          <div>
            <label className="block text-xs font-bold text-[#292524] uppercase tracking-wider mb-1.5">
              Recipe Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Crispy Masala Dosa, Paneer Butter Masala..."
              className="w-full bg-[#FFF8F0] px-4 py-2.5 rounded-xl border border-[#FED7AA] text-sm font-semibold text-[#292524] focus:border-[#F97316] outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#292524] uppercase tracking-wider mb-1.5">
              Short Description *
            </label>
            <textarea
              name="description"
              required
              rows={2}
              value={formData.description}
              onChange={handleChange}
              placeholder="A brief mouthwatering description of your dish..."
              className="w-full bg-[#FFF8F0] px-4 py-2.5 rounded-xl border border-[#FED7AA] text-sm text-[#292524] focus:border-[#F97316] outline-none"
            />
          </div>

          {/* Image URL & Quick Sample Pickers */}
          <div>
            <label className="block text-xs font-bold text-[#292524] uppercase tracking-wider mb-1.5">
              Food Photography Image URL
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#FFF8F0] px-4 py-2 rounded-xl border border-[#FED7AA] text-xs text-[#292524] focus:border-[#F97316] outline-none"
              />
            </div>

            {/* Quick Pick Preset Images */}
            <p className="text-[11px] text-[#78716C] mb-1 font-medium">Or pick a photo preset:</p>
            <div className="flex flex-wrap gap-1.5">
              {sampleFoodImages.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, image: preset.url }));
                    setImagePreview(preset.url);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                    formData.image === preset.url
                      ? 'bg-[#EA580C] text-white border-[#EA580C]'
                      : 'bg-[#FFF8F0] text-stone-700 border-[#FED7AA] hover:bg-[#FFE5D0]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category, Difficulty, Timings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#292524] uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#FFF8F0] px-3.5 py-2.5 rounded-xl border border-[#FED7AA] text-sm font-semibold text-[#292524] outline-none focus:border-[#F97316]"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#292524] uppercase tracking-wider mb-1.5">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full bg-[#FFF8F0] px-3.5 py-2.5 rounded-xl border border-[#FED7AA] text-sm font-semibold text-[#292524] outline-none focus:border-[#F97316]"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#292524] uppercase tracking-wider mb-1.5">
                Dietary Type
              </label>
              <div className="flex items-center h-[42px] px-3 bg-[#FFF8F0] rounded-xl border border-[#FED7AA]">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#292524]">
                  <input
                    type="checkbox"
                    name="isVegetarian"
                    checked={formData.isVegetarian}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#65A30D] rounded cursor-pointer"
                  />
                  <span>Vegetarian Dish</span>
                </label>
              </div>
            </div>
          </div>

          {/* Cooking Time, Prep Time, Servings */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#292524] uppercase tracking-wider mb-1.5">
                Cook Time (mins)
              </label>
              <input
                type="number"
                name="cookingTime"
                min="1"
                required
                value={formData.cookingTime}
                onChange={handleChange}
                className="w-full bg-[#FFF8F0] px-3.5 py-2 rounded-xl border border-[#FED7AA] text-sm font-semibold text-[#292524] outline-none focus:border-[#F97316]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#292524] uppercase tracking-wider mb-1.5">
                Prep Time (mins)
              </label>
              <input
                type="number"
                name="preparationTime"
                min="0"
                value={formData.preparationTime}
                onChange={handleChange}
                className="w-full bg-[#FFF8F0] px-3.5 py-2 rounded-xl border border-[#FED7AA] text-sm font-semibold text-[#292524] outline-none focus:border-[#F97316]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#292524] uppercase tracking-wider mb-1.5">
                Servings
              </label>
              <input
                type="number"
                name="servings"
                min="1"
                value={formData.servings}
                onChange={handleChange}
                className="w-full bg-[#FFF8F0] px-3.5 py-2 rounded-xl border border-[#FED7AA] text-sm font-semibold text-[#292524] outline-none focus:border-[#F97316]"
              />
            </div>
          </div>

          {/* Dynamic Ingredients Section */}
          <div className="pt-2 border-t border-[#FED7AA]/60">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#292524] uppercase tracking-wider">
                Ingredients List *
              </label>
              <button
                type="button"
                onClick={addIngredientRow}
                className="text-xs font-bold text-[#EA580C] hover:text-[#C2410C] flex items-center gap-1"
              >
                <Plus size={14} /> Add Ingredient
              </button>
            </div>

            <div className="space-y-2">
              {formData.ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ingredient Name (e.g. Paneer)"
                    value={ing.name}
                    onChange={(e) => handleIngredientChange(idx, 'name', e.target.value)}
                    className="flex-1 bg-[#FFF8F0] px-3 py-2 rounded-xl border border-[#FED7AA] text-xs font-medium text-[#292524] outline-none focus:border-[#F97316]"
                  />
                  <input
                    type="number"
                    step="any"
                    placeholder="Qty"
                    value={ing.quantity}
                    onChange={(e) => handleIngredientChange(idx, 'quantity', e.target.value)}
                    className="w-20 bg-[#FFF8F0] px-3 py-2 rounded-xl border border-[#FED7AA] text-xs font-medium text-[#292524] outline-none focus:border-[#F97316]"
                  />
                  <input
                    type="text"
                    placeholder="Unit (cups, g)"
                    value={ing.unit}
                    onChange={(e) => handleIngredientChange(idx, 'unit', e.target.value)}
                    className="w-24 bg-[#FFF8F0] px-3 py-2 rounded-xl border border-[#FED7AA] text-xs font-medium text-[#292524] outline-none focus:border-[#F97316]"
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredientRow(idx)}
                    className="p-2 text-stone-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Instructions Section */}
          <div className="pt-2 border-t border-[#FED7AA]/60">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#292524] uppercase tracking-wider">
                Cooking Instructions Steps *
              </label>
              <button
                type="button"
                onClick={addInstructionStep}
                className="text-xs font-bold text-[#EA580C] hover:text-[#C2410C] flex items-center gap-1"
              >
                <Plus size={14} /> Add Step
              </button>
            </div>

            <div className="space-y-2">
              {formData.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFE5D0] text-[#EA580C] text-xs font-bold flex items-center justify-center shrink-0 mt-2">
                    {idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    placeholder={`Step ${idx + 1} instructions...`}
                    value={step}
                    onChange={(e) => handleInstructionChange(idx, e.target.value)}
                    className="flex-1 bg-[#FFF8F0] px-3 py-2 rounded-xl border border-[#FED7AA] text-xs text-[#292524] outline-none focus:border-[#F97316]"
                  />
                  <button
                    type="button"
                    onClick={() => removeInstructionStep(idx)}
                    className="p-2 text-stone-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors mt-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#FED7AA] bg-[#FFF8F0] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary !py-2.5 !px-5 text-sm font-semibold"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary !py-2.5 !px-7 text-sm font-bold shadow-lg shadow-orange-500/25 flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={16} />
            <span>{isSubmitting ? 'Saving...' : recipeToEdit ? 'Save Changes' : 'Create Recipe'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RecipeFormModal;
