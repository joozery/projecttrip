const API_BASE_URL = "https://projecttour-b58cf17beb2d.herokuapp.com/api";

// ✅ ฟังก์ชันบันทึกข้อมูลทัวร์ (POST /api/tours)
export const saveTour = async (tourData) => {
  const formData = new FormData();
  Object.keys(tourData).forEach((key) => {
    if (key === "gallery") {
      tourData[key].forEach((file) => {
        formData.append("gallery", file);
      });
    } else {
      formData.append(key, tourData[key]);
    }
  });

  const response = await fetch(`${API_BASE_URL}/tours`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการบันทึกทัวร์");

  return response.json();
};

// ✅ ฟังก์ชันบันทึกแผนทัวร์ (POST /api/tourdays)
export const saveTourPlan = async (tourId, tourPlan) => {
  const formattedPlan = tourPlan.map((plan) => ({
    tour_id: tourId,
    day_number: plan.day,
    date: plan.date || null,
    description: plan.description,
    images: plan.images || [],
  }));

  const response = await fetch(`${API_BASE_URL}/tourdays`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tourPlan: formattedPlan }),
  });

  if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการบันทึกแผนทัวร์");

  return response.json();
};

// ✅ ฟังก์ชันดึงข้อมูลทัวร์จาก ID (GET /api/tours/:id)
export const getTourById = async (tourId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tours/${tourId}`);
    if (!response.ok) throw new Error("ไม่พบข้อมูลทัวร์");
    return await response.json();
  } catch (error) {
    console.error("Error fetching tour:", error);
    return null;
  }
};

// ✅ ฟังก์ชันดึงข้อมูลแผนทัวร์จาก tour_id (GET /api/tourdays/:tour_id)
export const getTourPlanByTourId = async (tourId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tourdays/${tourId}`);
    if (!response.ok) throw new Error("ไม่พบข้อมูลแผนทัวร์");
    return await response.json();
  } catch (error) {
    console.error("Error fetching tour plan:", error);
    return null;
  }
};

// ✅ ฟังก์ชันอัปเดตข้อมูลทัวร์ (PUT /api/tours/:id)
export const updateTour = async (tourId, tourData) => {
  const formData = new FormData();
  Object.keys(tourData).forEach((key) => {
    formData.append(key, tourData[key]);
  });

  const response = await fetch(`${API_BASE_URL}/tours/${tourId}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการอัปเดตทัวร์");

  return response.json();
};

// ✅ ฟังก์ชันอัปเดตแผนทัวร์ (PUT /api/tourdays/:id)
export const updateTourPlan = async (tourPlanId, planData) => {
  const response = await fetch(`${API_BASE_URL}/tourdays/${tourPlanId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(planData),
  });

  if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการอัปเดตแผนทัวร์");

  return response.json();
};