import Address from '../models/address.js';

// Create
export const add_address = async (req, res) => {
  try {
    const { phone, address, city, state, postalCode } = req.body;

    if (!phone || !address || !city || !state || !postalCode) {
      return res.status(400).json({ success: false, message: "All address fields are required" });
    }

    const newAddress = await Address.create({ user: req.user._id, phone, address, city, state, postalCode });

    res.status(201).json({
      success: true,
      message: "✅ Address saved successfully",
      address: newAddress,
    });
  } catch (error) {
    console.error("Error saving address:", error.message);
    res.status(500).json({ success: false, message: "❌ Failed to save address", error: error.message });
  }
};

// Read
export const get_addresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ Failed to fetch addresses", error: error.message });
  }
};

// Update
export const update_address = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Address.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Address not found" });

    res.status(200).json({ success: true, message: "✅ Address updated successfully", address: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ Failed to update address", error: error.message });
  }
};

// Delete
export const delete_address = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Address.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Address not found" });

    res.status(200).json({ success: true, message: "✅ Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ Failed to delete address", error: error.message });
  }
};
