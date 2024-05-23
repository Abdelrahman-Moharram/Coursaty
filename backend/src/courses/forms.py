from django import forms
from .models import Course
from accounts.models import User



class course_form(forms.ModelForm):
    # def __init__(self, *args, **kwargs):
    #     self.instructor = kwargs.pop('instructor', None)
    #     print(self.instructor)
    #     super().__init__(*args, **kwargs)
    #     #self.fields['instructor'].queryset = User.objects.filter(id= self.instructor)
    #     self.fields['instructor'] = self.request.user.id
    # def __init__(self, *args, instructor=None, **kwargs):
    #     super(course_form, self).__init__(*args, **kwargs)
    #     print(instructor)
    #     if instructor is not None:
    #         self.fields['instructor'].queryset = User.objects.filter(id=instructor)
    class Meta:
        model = Course
        fields = [
            'name',
            'description',
            'category',
            'subcategory',
            'industry',
            'image',
            'price',
            # 'instructor'
        ]
        
     
    
    def clean_name(self, *args, **kwargs):
        name = self.cleaned_data.get('name')
        return name.strip()
    
    def clean_description(self, *args, **kwargs):
        description = self.cleaned_data.get('description')
        return description.strip()
    