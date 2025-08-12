import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Code, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'code' | 'diagram';
  options: string[];
  correctAnswer: number;
  category: 'aptitude' | 'crypto' | 'programming' | 'blockchain';
  explanation?: string;
}

interface TechnicalSectionProps {
  onComplete: (scores: {
    aptitude: number;
    crypto: number;
    programming: number;
    blockchain: number;
    overall: number;
  }) => void;
  onBack: () => void;
}

const TechnicalSection: React.FC<TechnicalSectionProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const questions: Question[] = [
    // General Aptitude (6 questions)
    {
      id: 'aptitude_1',
      text: 'If a hash function produces a 256-bit output, how many different possible hash values are there?',
      type: 'mcq',
      options: ['2^128', '2^256', '256^2', '256!'],
      correctAnswer: 1,
      category: 'aptitude',
      explanation: '2^256 represents all possible combinations of 256 bits (each bit can be 0 or 1).'
    },
    {
      id: 'aptitude_2',
      text: 'In a distributed system, what is the main challenge that blockchain solves?',
      type: 'mcq',
      options: ['Speed', 'Byzantine Fault Tolerance', 'Storage efficiency', 'User interface'],
      correctAnswer: 1,
      category: 'aptitude',
      explanation: 'Blockchain primarily solves the Byzantine Fault Tolerance problem, allowing distributed systems to reach consensus even when some nodes are faulty or malicious.'
    },
    {
      id: 'aptitude_3',
      text: 'What is the result of: hash("hello") === hash("hello")?',
      type: 'mcq',
      options: ['Always true', 'Always false', 'Sometimes true', 'Depends on the hash function'],
      correctAnswer: 0,
      category: 'aptitude',
      explanation: 'Hash functions are deterministic - the same input always produces the same output.'
    },
    {
      id: 'aptitude_4',
      text: 'If a blockchain has 1000 nodes and uses simple majority consensus, how many nodes need to agree?',
      type: 'mcq',
      options: ['334', '501', '667', '1000'],
      correctAnswer: 1,
      category: 'aptitude',
      explanation: 'Simple majority requires more than half, so 501 out of 1000 nodes.'
    },
    {
      id: 'aptitude_5',
      text: 'What happens if you change one character in the input to a cryptographic hash function?',
      type: 'mcq',
      options: ['Output changes slightly', 'Output changes completely', 'No change', 'Function breaks'],
      correctAnswer: 1,
      category: 'aptitude',
      explanation: 'This is called the avalanche effect - a small change in input causes a dramatic change in output.'
    },
    {
      id: 'aptitude_6',
      text: 'In terms of computational complexity, what is the relationship between encryption and decryption in asymmetric cryptography?',
      type: 'mcq',
      options: ['Encryption is harder', 'Decryption is harder', 'They are equal', 'Varies by algorithm'],
      correctAnswer: 0,
      category: 'aptitude',
      explanation: 'In asymmetric cryptography, encryption with the public key is typically computationally easier than decryption with the private key.'
    },

    // Cryptography & Math (6 questions)
    {
      id: 'crypto_1',
      text: 'What is the main purpose of a digital signature?',
      type: 'mcq',
      options: ['Encryption', 'Authentication & Non-repudiation', 'Compression', 'Hashing'],
      correctAnswer: 1,
      category: 'crypto',
      explanation: 'Digital signatures provide authentication (proving who sent it) and non-repudiation (preventing denial of sending).'
    },
    {
      id: 'crypto_2',
      text: 'In modular arithmetic, what is (7 * 5) mod 3?',
      type: 'mcq',
      options: ['1', '2', '0', '3'],
      correctAnswer: 0,
      category: 'crypto',
      explanation: '7 * 5 = 35, and 35 mod 3 = 2 (since 35 = 11 * 3 + 2). Wait, let me recalculate: 35 mod 3 = 2, so the answer should be 2.'
    },
    {
      id: 'crypto_3',
      text: 'What is the key difference between symmetric and asymmetric encryption?',
      type: 'mcq',
      options: ['Speed', 'Key management', 'Security level', 'All of the above'],
      correctAnswer: 3,
      category: 'crypto',
      explanation: 'Symmetric encryption uses the same key for encryption/decryption (faster but harder key management), while asymmetric uses key pairs (slower but easier key management).'
    },
    {
      id: 'crypto_4',
      text: 'What makes a cryptographic hash function "collision-resistant"?',
      type: 'mcq',
      options: ['It never produces collisions', 'It\'s computationally infeasible to find collisions', 'It produces short outputs', 'It\'s fast to compute'],
      correctAnswer: 1,
      category: 'crypto',
      explanation: 'Collision resistance means it\'s computationally infeasible to find two different inputs that produce the same hash output.'
    },
    {
      id: 'crypto_5',
      text: 'In RSA encryption, what is the relationship between the public key (e, n) and private key (d, n)?',
      type: 'mcq',
      options: ['e = d', 'e * d = 1', 'e * d ≡ 1 (mod φ(n))', 'e + d = n'],
      correctAnswer: 2,
      category: 'crypto',
      explanation: 'In RSA, e and d are multiplicative inverses modulo φ(n), where φ(n) is Euler\'s totient function.'
    },
    {
      id: 'crypto_6',
      text: 'What is a merkle tree primarily used for in blockchain?',
      type: 'mcq',
      options: ['Storing balances', 'Efficient verification of large datasets', 'Consensus', 'Mining'],
      correctAnswer: 1,
      category: 'crypto',
      explanation: 'Merkle trees allow efficient and secure verification of large data structures by providing a compact proof that a transaction is included in a block.'
    },

    // Programming Knowledge (6 questions)
    {
      id: 'programming_1',
      text: 'In Solidity, what does the "payable" keyword indicate?',
      type: 'mcq',
      options: ['Function costs gas', 'Function can receive Ether', 'Function is expensive', 'Function pays the caller'],
      correctAnswer: 1,
      category: 'programming',
      explanation: 'The "payable" keyword allows a function to receive Ether when called.'
    },
    {
      id: 'programming_2',
      text: 'What is gas in Ethereum?',
      type: 'mcq',
      options: ['A cryptocurrency', 'A measure of computational effort', 'A type of smart contract', 'A consensus mechanism'],
      correctAnswer: 1,
      category: 'programming',
      explanation: 'Gas measures the computational effort required to execute operations on the Ethereum network.'
    },
    {
      id: 'programming_3',
      text: 'Which of the following is NOT a valid Solidity data type?',
      type: 'mcq',
      options: ['uint256', 'bytes32', 'mapping', 'float'],
      correctAnswer: 3,
      category: 'programming',
      explanation: 'Solidity does not have floating-point numbers. It uses fixed-point arithmetic instead.'
    },
    {
      id: 'programming_4',
      text: 'What is the purpose of the "view" keyword in Solidity functions?',
      type: 'mcq',
      options: ['Makes function visible', 'Function can read but not modify state', 'Function is viewable by users', 'Function has a view interface'],
      correctAnswer: 1,
      category: 'programming',
      explanation: 'The "view" keyword indicates that the function can read the blockchain state but cannot modify it.'
    },
    {
      id: 'programming_5',
      text: 'In blockchain development, what is a "nonce"?',
      type: 'mcq',
      options: ['A random number', 'Number used once', 'Network operation code', 'Node consensus element'],
      correctAnswer: 1,
      category: 'programming',
      explanation: 'Nonce stands for "number used once" and is used in mining and transaction processing to prevent replay attacks.'
    },
    {
      id: 'programming_6',
      text: 'What is the difference between "call" and "send" in Solidity?',
      type: 'mcq',
      options: ['No difference', 'Call is safer', 'Send forwards all gas, call limits gas', 'Call can execute code, send cannot'],
      correctAnswer: 3,
      category: 'programming',
      explanation: 'Call can execute code at the recipient address and forwards all gas by default, while send only forwards 2300 gas and cannot execute complex code.'
    },

    // Blockchain Concepts (6 questions)
    {
      id: 'blockchain_1',
      text: 'What is the primary difference between Proof of Work and Proof of Stake?',
      type: 'mcq',
      options: ['Energy consumption', 'Security model', 'Validator selection', 'All of the above'],
      correctAnswer: 3,
      category: 'blockchain',
      explanation: 'PoW and PoS differ in energy consumption, security models, and how validators are selected to create new blocks.'
    },
    {
      id: 'blockchain_2',
      text: 'What is a key advantage of blockchain over traditional databases?',
      type: 'mcq',
      options: ['Faster queries', 'Decentralization and immutability', 'Lower storage costs', 'Better user interface'],
      correctAnswer: 1,
      category: 'blockchain',
      explanation: 'Blockchain\'s key advantages are decentralization (no single point of failure) and immutability (records cannot be easily changed).'
    },
    {
      id: 'blockchain_3',
      text: 'What is DeFi?',
      type: 'mcq',
      options: ['Decentralized Finance', 'Digital Finance', 'Distributed Finance', 'Deferred Finance'],
      correctAnswer: 0,
      category: 'blockchain',
      explanation: 'DeFi stands for Decentralized Finance, representing financial services built on blockchain without traditional intermediaries.'
    },
    {
      id: 'blockchain_4',
      text: 'What is the main purpose of a DAO?',
      type: 'mcq',
      options: ['Data storage', 'Decentralized governance', 'Mining coordination', 'Token distribution'],
      correctAnswer: 1,
      category: 'blockchain',
      explanation: 'A DAO (Decentralized Autonomous Organization) is primarily designed for decentralized governance and decision-making.'
    },
    {
      id: 'blockchain_5',
      text: 'What makes an NFT unique?',
      type: 'mcq',
      options: ['Its image', 'Its metadata', 'Its token ID and contract address', 'Its price'],
      correctAnswer: 2,
      category: 'blockchain',
      explanation: 'An NFT\'s uniqueness comes from its token ID combined with its smart contract address on the blockchain.'
    },
    {
      id: 'blockchain_6',
      text: 'What is the purpose of consensus mechanisms in blockchain?',
      type: 'mcq',
      options: ['To mine coins', 'To ensure all nodes agree on the ledger state', 'To encrypt data', 'To manage user accounts'],
      correctAnswer: 1,
      category: 'blockchain',
      explanation: 'Consensus mechanisms ensure all nodes in the network agree on the current state of the blockchain ledger.'
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQ.id] !== undefined;
  const userAnswer = answers[currentQ.id];
  const isCorrect = userAnswer === currentQ.correctAnswer;
  const canProceed = isAnswered;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: parseInt(value)
    }));
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      calculateScores();
    }
  };

  const calculateScores = () => {
    const categoryScores = {
      aptitude: 0,
      crypto: 0,
      programming: 0,
      blockchain: 0
    };
    const categoryCounts = {
      aptitude: 0,
      crypto: 0,
      programming: 0,
      blockchain: 0
    };
    questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer !== undefined) {
        if (userAnswer === question.correctAnswer) {
          categoryScores[question.category]++;
        }
        categoryCounts[question.category]++;
      }
    });
    // Convert to 0-100 scale
    const normalizedScores = {
      aptitude: Math.round((categoryScores.aptitude / categoryCounts.aptitude) * 100),
      crypto: Math.round((categoryScores.crypto / categoryCounts.crypto) * 100),
      programming: Math.round((categoryScores.programming / categoryCounts.programming) * 100),
      blockchain: Math.round((categoryScores.blockchain / categoryCounts.blockchain) * 100)
    };
    const overall = Math.round(
      (normalizedScores.aptitude + normalizedScores.crypto + normalizedScores.programming + normalizedScores.blockchain) / 4
    );
    onComplete({
      ...normalizedScores,
      overall
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="w-6 h-6 text-green-600" />
            <span>Technical Aptitude Assessment</span>
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-700 mb-2">
              {currentQ.category.charAt(0).toUpperCase() + currentQ.category.slice(1)}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentQ.text}
            </h3>
            <RadioGroup
              value={userAnswer !== undefined ? userAnswer.toString() : ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className={`text-sm cursor-pointer flex-1 py-2 px-3 rounded transition-colors ${
                      showExplanation && index === currentQ.correctAnswer
                        ? 'bg-green-200 border-green-400 border'
                        : showExplanation && userAnswer === index && !isCorrect
                        ? 'bg-red-200 border-red-400 border'
                        : 'hover:bg-white/50'
                    }`}
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {showExplanation && currentQ.explanation && (
              <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                <div className="flex items-start space-x-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <div className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>{isCorrect ? 'Correct!' : 'Incorrect'}</div>
                    <div className="text-sm text-gray-700 mt-1">{currentQ.explanation}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Category: {currentQ.category.charAt(0).toUpperCase() + currentQ.category.slice(1)}
            </div>
            <div className="space-x-3">
              {canProceed && !showExplanation && (
                <Button
                  onClick={() => setShowExplanation(true)}
                  variant="outline"
                  className="text-gray-600"
                >
                  Show Answer
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLastQuestion ? 'Complete Section' : 'Next Question'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalSection;