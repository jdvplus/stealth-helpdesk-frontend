'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// const formSchema = z.object({
//   name: z
//     .string()
//     .min(2, { message: 'Name must be at least 2 characters.' })
//     .max(50, { message: 'Name cannot be longer than 50 characters.' }),
//   email: z.string().email({ message: 'Please enter a valid email address.' }),
//   description: z.string().min(4, {
//     message: "Please include a description of what you'd like help with.",
//   }),
// });

const TicketSubmissionForm = () => {
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     name: '',
  //     email: '',
  //     description: '',
  //   },
  // });

  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   // TODO: make POST request to /tickets on api
  //   console.log('values', values);
  // };

  return <h1>hello world</h1>;
};

export default TicketSubmissionForm;
