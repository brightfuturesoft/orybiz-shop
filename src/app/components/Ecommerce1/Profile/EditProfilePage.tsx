"use client"

import { useUserStore } from "@/store/userStore"
import { useState } from "react"

interface UserProfile {
  name: string
  email: string
  mobile: string
  birthday: {
    month: string
    day: string
    year: string
  }
  gender: string
}

export default function EditProfilePage() {
  const { user, loading, error, fetchUser, updateUser } = useUserStore();
  const [profile, setProfile] = useState<UserProfile>({
    name: "Mahadi Hasan",
    email: "CO******************@gmail.com",
    mobile: "",
    birthday: {
      month: "",
      day: "",
      year: "",
    },
    gender: "",
  })

  const [showChangeEmail, setShowChangeEmail] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [showAddMobile, setShowAddMobile] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())
  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString())

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!profile.name.trim()) {
      newErrors.name = "Full name is required"
    }

    if (newEmail && showChangeEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(newEmail)) {
        newErrors.email = "Please enter a valid email address"
      }
    }

    if (profile.mobile && !/^\+?[\d\s-()]+$/.test(profile.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveChanges = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Saving profile changes:", profile)
      alert("Profile updated successfully!")

      if (showChangeEmail) {
        setShowChangeEmail(false)
        setNewEmail("")
      }
      if (showAddMobile) {
        setShowAddMobile(false)
      }
    } catch (error) {
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangeEmail = () => {
    if (showChangeEmail && newEmail) {
      if (validateForm()) {
        setProfile({ ...profile, email: newEmail })
        setShowChangeEmail(false)
        setNewEmail("")
        setErrors({ ...errors, email: "" })
      }
    } else {
      setShowChangeEmail(true)
    }
  }

  const handleAddMobile = () => {
    if (!profile.mobile) {
      setShowAddMobile(true)
    }
  }

  const clearName = () => {
    setProfile({ ...profile, name: "" })
    setErrors({ ...errors, name: "" })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 md:mb-8">Edit Profile</h1>

        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
          <div className="space-y-6">
            {/* Full Name Field */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => {
                      setProfile({ ...profile, name: e.target.value })
                      if (errors.name) setErrors({ ...errors, name: "" })
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {profile.name && (
                    <button
                      onClick={clearName}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs hover:bg-gray-500"
                    >
                      ×
                    </button>
                  )}
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address |{" "}
                  <button onClick={handleChangeEmail} className="text-blue-600 hover:text-blue-700 font-normal">
                    Change
                  </button>
                </label>
                {showChangeEmail ? (
                  <div className="space-y-2">
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => {
                        setNewEmail(e.target.value)
                        if (errors.email) setErrors({ ...errors, email: "" })
                      }}
                      placeholder="Enter new email"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    <div className="flex space-x-2">
                      <button
                        onClick={handleChangeEmail}
                        disabled={!newEmail}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setShowChangeEmail(false)
                          setNewEmail("")
                          setErrors({ ...errors, email: "" })
                        }}
                        className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700">
                    {profile.email}
                  </div>
                )}
              </div>

              {/* Mobile Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile |{" "}
                  <button onClick={handleAddMobile} className="text-blue-600 hover:text-blue-700 font-normal">
                    Add
                  </button>
                </label>
                {showAddMobile || profile.mobile ? (
                  <div className="space-y-2">
                    <input
                      type="tel"
                      value={profile.mobile}
                      onChange={(e) => {
                        setProfile({ ...profile, mobile: e.target.value })
                        if (errors.mobile) setErrors({ ...errors, mobile: "" })
                      }}
                      placeholder="Please enter your mobile"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 ${
                        errors.mobile ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                    {showAddMobile && !profile.mobile && (
                      <button
                        onClick={() => setShowAddMobile(false)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-400">
                    Please enter your mobile
                  </div>
                )}
              </div>
            </div>

            {/* Birthday and Gender Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Birthday Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Birthday</label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={profile.birthday.month}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        birthday: { ...profile.birthday, month: e.target.value },
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  >
                    <option value="">Month</option>
                    {months.map((month, index) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={profile.birthday.day}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        birthday: { ...profile.birthday, day: e.target.value },
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  >
                    <option value="">Day</option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    value={profile.birthday.year}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        birthday: { ...profile.birthday, year: e.target.value },
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  >
                    <option value="">Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Gender Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="pt-4">
              <button
                onClick={handleSaveChanges}
                disabled={isLoading}
                className={`w-full md:w-auto px-8 py-3 font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                {isLoading ? "SAVING..." : "SAVE CHANGES"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// "use client";

// import { useUserStore } from "@/store/userStore";
// import { useState, useEffect } from "react";

// interface UserProfile {
//   name: string;
//   email: string;
//   mobile: string;
//   birthday: {
//     month: string;
//     day: string;
//     year: string;
//   };
//   gender: string;
// }

// export default function EditProfilePage() {
//   const { user, loading, error, fetchUser, updateUser } = useUserStore();

//   const [profile, setProfile] = useState<UserProfile>({
//     name: "",
//     email: "",
//     mobile: "",
//     birthday: { month: "", day: "", year: "" },
//     gender: "",
//   });

//   const [showChangeEmail, setShowChangeEmail] = useState(false);
//   const [newEmail, setNewEmail] = useState("");
//   const [showAddMobile, setShowAddMobile] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);

//   const months = [
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December",
//   ];
//   const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
//   const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

//   // Load user into form
//   useEffect(() => {
//     fetchUser();
//   }, [fetchUser]);

//   useEffect(() => {
//     if (user) {
//       setProfile({
//         name: user.full_name || "",
//         email: user.email || "",
//         mobile: user.phone_number || "",
//         birthday: user.birthday || { month: "", day: "", year: "" },
//         gender: user.gender || "",
//       });
//     }
//   }, [user]);

//   // Validation
//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!profile.name.trim()) newErrors.name = "Full name is required";

//     if (showChangeEmail && newEmail) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(newEmail)) newErrors.email = "Invalid email";
//     }

//     if (profile.mobile && !/^\+?[\d\s-()]+$/.test(profile.mobile)) newErrors.mobile = "Invalid mobile";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Save changes
//   const handleSaveChanges = async () => {
//     if (!validateForm()) return;

//     setIsLoading(true);

//     try {
//       const payload: Partial<typeof user> = {
//         full_name: profile.name,
//         email: showChangeEmail ? newEmail : profile.email,
//         phone_number: profile.mobile,
//         birthday: profile.birthday,
//         gender: profile.gender,
//       };

//       await updateUser(payload);
//       alert("Profile updated successfully!");

//       if (showChangeEmail) { setShowChangeEmail(false); setNewEmail(""); }
//       if (showAddMobile) setShowAddMobile(false);
//     } catch {
//       alert("Failed to update profile. Try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Clear name
//   const clearName = () => {
//     setProfile({ ...profile, name: "" });
//     setErrors({ ...errors, name: "" });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 md:mb-8">Edit Profile</h1>

//         <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
//           <div className="space-y-6">
//             {/* Full Name */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={profile.name}
//                     onChange={(e) => { setProfile({ ...profile, name: e.target.value }); if(errors.name) setErrors({ ...errors, name: "" }); }}
//                     className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8 ${errors.name ? "border-red-500" : "border-gray-300"}`}
//                   />
//                   {profile.name && (
//                     <button onClick={clearName} className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs hover:bg-gray-500">×</button>
//                   )}
//                 </div>
//                 {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email |{" "}
//                   <button onClick={() => setShowChangeEmail(!showChangeEmail)} className="text-blue-600 hover:text-blue-700 font-normal">
//                     Change
//                   </button>
//                 </label>
//                 {showChangeEmail ? (
//                   <div className="space-y-2">
//                     <input
//                       type="email"
//                       value={newEmail}
//                       onChange={(e) => { setNewEmail(e.target.value); if(errors.email) setErrors({ ...errors, email: "" }); }}
//                       placeholder="Enter new email"
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
//                     />
//                     {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//                     <div className="flex space-x-2">
//                       <button onClick={handleSaveChanges} disabled={!newEmail} className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Save</button>
//                       <button onClick={() => { setShowChangeEmail(false); setNewEmail(""); setErrors({ ...errors, email: "" }); }} className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400">Cancel</button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700">{profile.email}</div>
//                 )}
//               </div>

//               {/* Mobile */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Mobile |{" "}
//                   <button onClick={() => setShowAddMobile(true)} className="text-blue-600 hover:text-blue-700 font-normal">Add</button>
//                 </label>
//                 {showAddMobile || profile.mobile ? (
//                   <div className="space-y-2">
//                     <input
//                       type="tel"
//                       value={profile.mobile}
//                       onChange={(e) => { setProfile({ ...profile, mobile: e.target.value }); if(errors.mobile) setErrors({ ...errors, mobile: "" }); }}
//                       placeholder="Please enter your mobile"
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 ${errors.mobile ? "border-red-500" : "border-gray-300"}`}
//                     />
//                     {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
//                     {showAddMobile && !profile.mobile && <button onClick={() => setShowAddMobile(false)} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>}
//                   </div>
//                 ) : (
//                   <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-400">Please enter your mobile</div>
//                 )}
//               </div>
//             </div>

//             {/* Birthday & Gender */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Birthday</label>
//                 <div className="grid grid-cols-3 gap-2">
//                   <select value={profile.birthday.month} onChange={(e) => setProfile({ ...profile, birthday: { ...profile.birthday, month: e.target.value }})} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
//                     <option value="">Month</option>{months.map(m => <option key={m} value={m}>{m}</option>)}
//                   </select>
//                   <select value={profile.birthday.day} onChange={(e) => setProfile({ ...profile, birthday: { ...profile.birthday, day: e.target.value }})} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
//                     <option value="">Day</option>{days.map(d => <option key={d} value={d}>{d}</option>)}
//                   </select>
//                   <select value={profile.birthday.year} onChange={(e) => setProfile({ ...profile, birthday: { ...profile.birthday, year: e.target.value }})} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
//                     <option value="">Year</option>{years.map(y => <option key={y} value={y}>{y}</option>)}
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
//                 <select value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
//                   <option value="">Select</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                   <option value="prefer-not-to-say">Prefer not to say</option>
//                 </select>
//               </div>
//             </div>

//             {/* Save Button */}
//             <div className="pt-4">
//               <button
//                 onClick={handleSaveChanges}
//                 disabled={isLoading}
//                 className={`w-full md:w-auto px-8 py-3 font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${isLoading ? "bg-gray-400 cursor-not-allowed text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
//               >
//                 {isLoading ? "SAVING..." : "SAVE CHANGES"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
