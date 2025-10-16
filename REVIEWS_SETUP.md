# Reviews Feature Setup Guide

This guide will help you set up the client reviews feature for your Levelers agency website.

## 📋 What's Included

1. **ReviewForm Component** - A beautiful modal form for submitting reviews
2. **Database Schema** - SQL script to create the reviews table in Supabase
3. **Integration** - Already integrated into the Reviews section with a "Leave a Review" button

## 🗄️ Database Setup

### Step 1: Run the SQL Script in Supabase

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor**
3. Open the file `supabase-reviews-schema.sql`
4. Copy and paste the entire SQL script into the Supabase SQL Editor
5. Click **Run** to execute the script

This will create:
- ✅ `reviews` table with all necessary columns
- ✅ Indexes for better query performance
- ✅ Row Level Security (RLS) policies
- ✅ Automatic timestamp updates

### Step 2: Verify the Table

1. Go to **Table Editor** in Supabase
2. You should see a new table called `reviews`
3. Check the columns:
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key to auth.users)
   - `user_email` (TEXT)
   - `name` (TEXT)
   - `role` (TEXT, Optional)
   - `company` (TEXT, Optional)
   - `rating` (INTEGER, 1-5)
   - `review_text` (TEXT)
   - `is_approved` (BOOLEAN, default: false)
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

## 🔐 Security Policies

The following Row Level Security policies are automatically created:

1. **Insert**: Users can only insert their own reviews
2. **Select (Public)**: Anyone can view approved reviews
3. **Select (Private)**: Users can view their own reviews (approved or not)
4. **Update**: Users can update their own unapproved reviews

## 🎨 Features

### User Experience
- ✨ Beautiful modal form with gradient design
- 🌟 Star rating system (1-5 stars)
- ✅ Form validation (name, review text min 20 chars)
- 🔒 Authentication required
- 📱 Fully responsive
- ✨ Success confirmation modal

### Admin Features (Manual Approval)
Reviews are submitted with `is_approved = false` by default. You can approve them:

#### Option 1: Supabase Dashboard (Quick)
1. Go to **Table Editor** → `reviews`
2. Find the review you want to approve
3. Click on the row
4. Change `is_approved` to `true`
5. Save

#### Option 2: SQL Query (Bulk Approve)
```sql
-- Approve a specific review
UPDATE reviews 
SET is_approved = true 
WHERE id = 'review-uuid-here';

-- Approve all 5-star reviews
UPDATE reviews 
SET is_approved = true 
WHERE rating = 5;

-- View pending reviews
SELECT * FROM reviews 
WHERE is_approved = false 
ORDER BY created_at DESC;
```

## 🚀 How Users Submit Reviews

1. User clicks **"Leave a Review"** button on the Reviews section
2. Modal form opens
3. If not logged in, they see a prompt to login
4. Once logged in, they fill out:
   - Name (required)
   - Role (optional)
   - Company (optional)
   - Rating (1-5 stars, default 5)
   - Review text (minimum 20 characters, required)
5. Click **"Submit Review"**
6. Review is stored in database with `is_approved = false`
7. Success message shows: "Your review has been submitted and is pending approval"

## 📊 Displaying Approved Reviews

To fetch and display approved reviews from the database (instead of hardcoded testimonials):

```javascript
// In your Reviews component
const [testimonials, setTestimonials] = useState([]);

useEffect(() => {
  fetchApprovedReviews();
}, []);

async function fetchApprovedReviews() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(10);

  if (data) {
    const formattedReviews = data.map(review => ({
      id: review.id,
      quote: review.review_text,
      name: review.name,
      role: review.role || 'Client',
      company: review.company || 'Customer',
      rating: review.rating
    }));
    setTestimonials(formattedReviews);
  }
}
```

## 🎯 Future Enhancements

Consider adding:
- 📧 Email notification when new review is submitted
- 👨‍💼 Admin dashboard to approve/reject reviews
- ⭐ Display star ratings in testimonial cards
- 📈 Review analytics (average rating, total count)
- 🔍 Filter reviews by rating or service type
- 💬 Reply to reviews feature

## 🐛 Troubleshooting

### "Failed to submit review"
- Check if user is authenticated
- Verify Supabase connection
- Check browser console for detailed error
- Ensure RLS policies are enabled

### Reviews not showing
- Check if reviews are approved (`is_approved = true`)
- Verify RLS policies allow reading approved reviews
- Check Supabase API connection

### Authentication issues
- Ensure `NEXT_PUBLIC_SUPABASE_URL` is set
- Ensure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- Check if user is logged in before submitting

## 📝 Notes

- All reviews require manual approval for quality control
- Users must be authenticated to submit reviews
- Rating is required (1-5 stars)
- Review text must be at least 20 characters
- Users can see their own pending reviews in their profile (if you build that feature)

## 🎉 That's It!

Your review system is now ready to use! Users can submit reviews, and you can approve them from the Supabase dashboard.
